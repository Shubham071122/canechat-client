import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    // const isAuthenticated = true;
  
    if (loading) {
      return (
        <div className="w-full h-screen flex items-center justify-center text-white text-[40px]">
          Loading...
        </div>
      );
    }
  
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute