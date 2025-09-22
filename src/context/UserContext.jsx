import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  // Legacy method - keeping for backward compatibility
  const getUserDataById = async (userId) => {
    return await fetchUser(userId);
  };

  // Get userData for backward compatibility
  const userData = users[Object.keys(users)[0]] || '';

  // Fetch user data by ID with caching
  const fetchUser = useCallback(async (userId, forceRefresh = false) => {
    if (users[userId] && !forceRefresh) {
      return users[userId];
    }

    try {
      setLoading(prev => ({ ...prev, [userId]: true }));
      setErrors(prev => ({ ...prev, [userId]: null }));

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/u/${userId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const userData = response.data.data;
        setUsers(prev => ({ ...prev, [userId]: userData }));
        return userData;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrors(prev => ({ ...prev, [userId]: error.message }));
      toast.error('Something went wrong!');
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  }, [users]);

  // Send friend request
  const sendFriendRequest = useCallback(async (userName, userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/send-request`,
        { toFriend: userName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Friend request sent!");
        
        // Update user data to reflect new friendship status
        await fetchUser(userId, true);
        return response.data;
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Failed to send friend request.");
      throw error;
    }
  }, [fetchUser]);

  // Accept friend request
  const acceptFriendRequest = useCallback(async (requestId, userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/accept-request`,
        { requestId: requestId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Friend request accepted!");
        
        await fetchUser(userId, true);
        return response.data;
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Failed to accept friend request.");
      throw error;
    }
  }, [fetchUser]);

  // Reject friend request
  const rejectFriendRequest = useCallback(async (requestId, userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/reject-request`,
        { requestId: requestId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Friend request rejected.");
        
        await fetchUser(userId, true);
        return response.data;
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      toast.error("Failed to reject friend request.");
      throw error;
    }
  }, [fetchUser]);

  // Unfriend user
  const unfriendUser = useCallback(async (userName, userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/unfriend-user`,
        { friendUserName: userName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("User unfriended.");
        await fetchUser(userId, true);
        return response.data;
      }
    } catch (error) {
      console.error("Error unfriending user:", error);
      toast.error("Failed to unfriend user.");
      throw error;
    }
  }, [fetchUser]);

  // Block user
  const blockUser = useCallback(async (userName, userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/block-user`,
        { friendUserName: userName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("User blocked.");
        
        // Update user data to reflect new status
        await fetchUser(userId, true);
        return response.data;
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user.");
      throw error;
    }
  }, [fetchUser]);

  // Unblock user
  const unblockUser = useCallback(async (userName, userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/unblock-user`,
        { friendUserName: userName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("User unblocked.");
        
        // Update user data to reflect new status
        await fetchUser(userId, true);
        return response.data;
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user.");
      throw error;
    }
  }, [fetchUser]);

  // Get user from cache
  const getUser = useCallback((userId) => {
    return users[userId] || null;
  }, [users]);

  // Check if user is loading
  const isUserLoading = useCallback((userId) => {
    return loading[userId] || false;
  }, [loading]);

  // Get user error
  const getUserError = useCallback((userId) => {
    return errors[userId] || null;
  }, [errors]);

  const value = {
    // Legacy support
    getUserDataById,
    userData,
    
    // New methods
    fetchUser,
    getUser,
    isUserLoading,
    getUserError,
    
    // Friend operations
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriendUser,
    blockUser,
    unblockUser,
    
    // Data
    users,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
