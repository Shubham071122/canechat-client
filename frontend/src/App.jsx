import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import HomePage from './pages/HomePage';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import FriendRequest from './components/friendRequest/FriendRequest';
import UserChat from './components/chat/UserChat';
import FriendProfile from './components/profile/FriendProfile';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';
import ServerError from './pages/ServerError';

function App() {
  const { isAuthenticated, loading } = useAuth();

  console.log('isAuthenticated:', isAuthenticated);
  console.log('loading:', loading);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/user" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/user" replace /> : <Register />
        }
      />
      <Route path="/server-failed" element={<ServerError />} />

      {/* Protected Routes - Now Each One is Inside PrivateRoute */}
      <Route
        path="/user/*"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      >
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="friend-request" element={<FriendRequest />} />
        <Route path="newfriend" element={<FriendProfile />} />
        <Route path="chat/:userId" element={<UserChat />} />
        <Route path="f/:userId" element={<FriendProfile />} />
      </Route>

      {/* Catch-all for 404 */}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
