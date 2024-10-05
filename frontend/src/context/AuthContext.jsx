import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/check-auth`,{withCredentials: true});
        if (response.status == 200) {
          setIsAuthenticated(true);
          setUserData(response.data.user);
          setCurrentUserId(response.data.user._id);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Auth failed:', error);
      }
    };
    checkAuthStatus();
  }, []);

  const loginUser = async (loginData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/login`, loginData, {
        withCredentials: true,
      });

      if(response.data.statusCode == 200){
        setIsAuthenticated(true);
        setUserData(response.data.data.user);
        setCurrentUserId(response.data.data.user._id);
      }
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
    }
  };

  const registerUser = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/register`, data);
        if (response.data.statusCode === 200) {
            setIsAuthenticated(true);
            setUserData(response.data.data.user);
        }
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        setIsAuthenticated(false);
    }
};

  const logout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/logout`, {}, { withCredentials: true });
      if(response.status === 200){
        setIsAuthenticated(false);
        setUserData(null);
      }
      return response.status;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, userData,currentUserId, loginUser, registerUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);