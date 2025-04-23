import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

function Chat() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!token || !storedUsername) {
      navigate('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const joinRoom = () => {
    if (room) {
      socket.emit('join_room', { username, room });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.emit('leave_room', room);
    setRoom('');
    setChat([]);
    setJoined(false);
  };

  const sendMessage = () => {
    if (message) {
      socket.emit('send_message', { username, text: message, room });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('room_messages', (messages) => setChat(messages));
    socket.on('receive_message', (data) => setChat((prev) => [...prev, data]));
    return () => {
      socket.off('room_messages');
      socket.off('receive_message');
    };
  }, []);

  if (!joined) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '400px' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Join a Chat Room</h2>
          <input
            style={{
              width: '100%', // Make the input box take the full width
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box', // Ensure consistent sizing
            }}
            placeholder="Room Code"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            onClick={joinRoom}
            style={{
              width: '100%', // Match the width of the input box
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '600px' }}>
        <h3 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Room: {room}</h3>
        <div
          style={{
            height: '300px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {chat.map((msg, index) => (
            <p key={index} style={{ marginBottom: '10px' }}>
              <strong style={{ color: msg.username === 'System' ? '#007bff' : '#333' }}>{msg.username}</strong>: {msg.text}
            </p>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
          <button
            onClick={leaveRoom}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;