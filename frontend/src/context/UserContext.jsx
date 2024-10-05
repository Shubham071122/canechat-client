import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState('');

  const getUserDataById = async (userId) => {
    if (userData._id === userId) {
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/u/${userId}`,
        { withCredentials: true },
      );
      if (response.status === 200) {
        setUserData(response.data.data);
      }
      return response;
    } catch (error) {
      console.log('Error while fetcing user data:', error);
      toast.error('Somenting went wrong!');
    }
  };

  return (
    <UserContext.Provider value={{ getUserDataById, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
