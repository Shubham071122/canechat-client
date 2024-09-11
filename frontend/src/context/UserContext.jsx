import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUserDataById = async (userId) => {
    const [userData,setUserData] = useState('');

    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/U/${userId}`,
      { withCredentials: true },
    );
    console.log("resud:",response);
    if(response.status === 200){

    }
  };

  return <UserContext.Provider value={{getUserDataById}}>
    {children}
    </UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
