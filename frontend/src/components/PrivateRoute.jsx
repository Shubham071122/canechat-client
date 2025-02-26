import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext'
import Loader from './Loader';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
  
    if (isAuthenticated === null) {
      return <Loader />;
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;