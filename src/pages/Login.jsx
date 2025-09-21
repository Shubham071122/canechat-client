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
    
    if (errors[name]) {
      const newErrors = { ...errors };
      
      if (name === 'userData') {
        if (value.includes('@') && value.length > 0) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(value)) {
            delete newErrors.userData;
          } else {
            newErrors.userData = 'Please enter a valid email address!';
          }
        } else if (!value.includes('@') && value.length > 0) {
          if (value.startsWith('@')) {
            delete newErrors.userData;
          } else {
            newErrors.userData = 'Username must start with @!';
          }
        } else if (value.length === 0) {
          delete newErrors.userData;
        }
      }
      
      setErrors(newErrors);
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setLoginData({ ...loginData, password: value });
    
    if (errors.password && value.length > 0) {
      const newErrors = { ...errors };
      delete newErrors.password;
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    const { userData, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!userData.trim()) {
      newErrors.userData = 'Email or username is required!';
    } else if (userData.includes('@')) {
      if (!emailRegex.test(userData)) {
        newErrors.userData = 'Please enter a valid email address!';
      }
    } else {
      if (!userData.startsWith('@')) {
        newErrors.userData = 'Username must start with @!';
      }
    }
  
    if (!password.trim()) {
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
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <img src={Logo} alt="Can-e-Chat Logo" className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to continue to Can-e-Chat</p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email/Username Input */}
            <div className="space-y-2">
              <label htmlFor="userData" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email or Username
              </label>
              <input
                id="userData"
                type="text"
                name="userData"
                placeholder="Enter your email or @username"
                value={loginData.userData}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.userData 
                    ? 'border-red-300 dark:border-red-600' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
                noValidate
              />
              {errors.userData && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <span className="text-xs">⚠</span> {errors.userData}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-200 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                  noValidate
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <BsFillEyeSlashFill className="text-xl" />
                  ) : (
                    <BsFillEyeFill className="text-xl" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <span className="text-xs">⚠</span> {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forget-password"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LiaSpinnerSolid className="animate-spin text-xl" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Can-e-Chat. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
