import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from "./components/chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const isAuth = () => !!localStorage.getItem('token');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={isAuth() ? <Chat /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
