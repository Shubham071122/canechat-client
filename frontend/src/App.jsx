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
import FriendProfile from './components/profile/FriendProfile';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {!isAuthenticated ? (
          <Route path="/" element={<LandingPage />} />
        ) : (
          <Route
            path="/"
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
          </Route>
        )}

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
