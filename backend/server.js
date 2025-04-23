const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const Message = require('./models/Message');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', async ({ username, room }) => {
    socket.join(room);
    const messages = await Message.find({ room }).sort({ timestamp: 1 }).limit(50);
    socket.emit('room_messages', messages);

    // Broadcast a message to the room that the user has joined
    const joinMessage = { username: 'System', text: `${username} has entered the chat`, room };
    io.to(room).emit('receive_message', joinMessage);
  });

  socket.on('send_message', async ({ username, text, room }) => {
    const message = new Message({ username, text, room });
    await message.save();
    io.to(room).emit('receive_message', message);
  });
  
  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
    io.to(room).emit('receive_message', { username: 'System', text: `${socket.id} has left the chat`, room });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
