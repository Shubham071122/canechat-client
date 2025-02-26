import React, { useState } from 'react';
import Logo from '../assets/ce-logo.png';
import { FcGoogle } from 'react-icons/fc';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [loginData, setLoginData] = useState({
    userData: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    userData: '',
    password: '',
  });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setLoginData({ ...loginData, password: value });
  };

  const validateForm = () => {
    const newErrors = {};
  
    const { userData, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (userData.includes('@')) {
      if (!emailRegex.test(userData)) {
        newErrors.userData = 'Please enter a valid email address!';
      }
    } else {
      if (!userData.startsWith('@')) {
        newErrors.userData = 'Username must start with @!';
      }
    }
  
    if (!password) {
      newErrors.password = 'Password is required!';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      toast.error('Fill all required fields!');
      setLoading(false);
      return;
    }

    // Prepare the loginData object to send to the backend
  const payload = {};

  if (loginData.userData.includes('@')) {
    payload.email = loginData.userData;
  } else {
    payload.userName = loginData.userData;
  }

  payload.password = loginData.password;

    try {
      const response = await loginUser(payload);
      if(response.statusCode === 200){
        console.log("res:",response);
        setLoading(false);
        toast.success('Login successful!');
        navigate("/user")
      }
    } catch (error) {
      setLoading(false);
      console.log('Error while login:', error);
      toast.error('Someting went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen min-h-screen">
      <Navbar />
      <section className="w-full px-4 sm:px-0 flex items-center justify-center text-black h-full bg-blue-300 dark:bg-slate-600">
        <div className="border-2 w-full sm:w-4/12 py-10 px-8 sm:px-12 rounded-3xl shadow-2xl bg-white dark:bg-slate-800">
          <div className="w-full flex flex-col items-center">
            <img src={Logo} alt="logo" className="w-20 h-20" />
            <h2 className="text-gray-600 dark:text-gray-50 font-semibold text-2xl mt-3">
              Welcome Back Buddy!
            </h2>
          </div>
          <div className="my-7">
            <input
              type="text"
              placeholder="Email or username"
              name="userData"
              value={loginData.userData}
              onChange={handleInputChange}
              className="w-full px-4 py-4 rounded-xl outline-blue-900 text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 text-xl"
            />
            {errors.userData && (
              <p className="text-red-500 text-sm">{errors.userData}</p>
            )}
            <div className="mt-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-4 rounded-xl outline-blue-900 text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 text-xl"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[17px] text-gray-400 text-lg"
              >
                {showPassword ? (
                  <BsFillEyeSlashFill className="text-2xl" />
                ) : (
                  <BsFillEyeFill className="text-2xl" />
                )}
              </button>
            </div>
            <Link
              to="/forget-password"
              className=" text-blue-400 font-thin ml-1"
            >
              Forget Password?
            </Link>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex flex-row justify-center items-center bg-blue-700 text-white font-medium text-2xl py-3 rounded-xl hover:transition-all 300ms ease-in-out hover:bg-blue-600"
          >
            {loading ? (
              <LiaSpinnerSolid className="animate-spin text-3xl" />
            ) : (
              'SignIn'
            )}
          </button>
          <div className="w-full flex flex-row justify-center items-center my-5">
            <div className="w-full h-[0.5px] bg-gray-400"></div>
            <p className="mx-2 text-gray-400 text-sm font-thin">OR</p>
            <div className="w-full h-[0.5px] bg-gray-400"></div>
          </div>
          <p className="w-full flex flex-row justify-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </section>
  );
}

export default Login;
