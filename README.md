# Chat App (MERN Stack)

A real-time chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Socket.IO** for real-time communication.

## Features

- User authentication (Sign Up and Login).
- Real-time messaging in chat rooms.
- Join and leave chat rooms dynamically.
- Password validation (minimum 6 characters).
- Responsive and user-friendly UI.

---

## Tech Stack

### Frontend:
- **React.js**: For building the user interface.
- **React Router**: For navigation between pages.
- **Axios**: For making HTTP requests.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **Socket.IO**: For real-time communication.

### Database:
- **MongoDB**: For storing user data and chat messages.

---

## Installation

### Prerequisites:
- Node.js and npm installed on your system.
- MongoDB installed and running locally or on a cloud service (e.g., MongoDB Atlas).

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     MONGO_URI=mongodb://localhost:27017/chat-app
     JWT_SECRET=your_jwt_secret
     ```
   - Replace `your_jwt_secret` with a secure secret key.

5. Start the backend server:
   ```bash
   cd ../backend
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

7. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## Project Structure

### Backend (`/backend`):
- **`server.js`**: Entry point for the backend server.
- **`routes/`**: Contains API routes for user authentication and chat functionality.
- **`models/`**: Mongoose models for users and messages.
- **`controllers/`**: Contains logic for handling API requests.

### Frontend (`/frontend`):
- **`src/components/`**: Contains React components like `Chat.jsx`.
- **`src/pages/`**: Contains pages like `Signup.jsx` and `Login.jsx`.
- **`src/index.css`**: Global styles for the application.

---

## Usage

1. **Sign Up**:
   - Create a new account by providing a username, email, and password (minimum 6 characters).

2. **Log In**:
   - Log in with your registered email and password.

3. **Join a Chat Room**:
   - Enter a room code to join a chat room.
   - Start sending messages in real-time.

4. **Leave a Chat Room**:
   - Click the "Leave Room" button to exit the chat room.


## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---
