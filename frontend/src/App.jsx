import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import HomePage from './pages/HomePage';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import FriendRequest from './components/friendRequest/FriendRequest';
import UserChat from './components/chat/UserChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="friend-request" element={<FriendRequest />} />
          <Route path="userchat" element={<UserChat />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
