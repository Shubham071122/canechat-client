import React, { useEffect, useState } from 'react';
import Logo from '../assets/ce-logo.png';
import avatarPlaceholder from '../assets/avatarplaceholder.png';
import { FcGoogle } from 'react-icons/fc';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    // userName: '',
    password: '',
    avatar: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
      

      if (errors.avatar && e.target.files[0]) {
        const newErrors = { ...errors };
        delete newErrors.avatar;
        setErrors(newErrors);
      }
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      
      if (errors[name]) {
        const newErrors = { ...errors };
        
        if (name === 'fullName' && value.trim().length > 0) {
          delete newErrors.fullName;
        } else if (name === 'email' && value.length > 0) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(value)) {
            delete newErrors.email;
          } else {
            newErrors.email = 'Please enter a valid email address!';
          }
        } else if (name === 'password' && value.length > 0) {
          delete newErrors.password;
        }
        
        setErrors(newErrors);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required!';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required!';
    } else {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address!';
      }
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required!';
    }
    
    if (!formData.avatar) {
      newErrors.avatar = 'Profile picture is required!';
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

    // Creating FormData object to send data including the file
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', formData.avatar);

    try {
      const response = await registerUser(data);
      console.log("response:",response);
      // if(response.statusCode === 200){
        setLoading(false);
        toast.success('Register successfully');
        navigate('/login');
      // }
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join Can-e-Chat</h1>
          <p className="text-gray-600 dark:text-gray-400">Create your account to get started</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Avatar Upload */}
            <div className="text-center">
              <label htmlFor="avatarInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Profile Picture
              </label>
              <div className="inline-block relative">
                <div
                  className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-600 cursor-pointer overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                  style={{
                    backgroundImage: formData.avatar
                      ? `url(${URL.createObjectURL(formData.avatar)})`
                      : `url(${avatarPlaceholder})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onClick={() => document.getElementById('avatarInput').click()}
                >
                  <input
                    type="file"
                    id="avatarInput"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-blue-600 transition-colors">
                  +
                </div>
              </div>
              {errors.avatar && (
                <p className="text-sm text-red-500 flex items-center justify-center gap-1 mt-2">
                  <span className="text-xs">⚠</span> {errors.avatar}
                </p>
              )}
            </div>

            {/* Full Name Input */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName 
                    ? 'border-red-300 dark:border-red-600' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <span className="text-xs">⚠</span> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email 
                    ? 'border-red-300 dark:border-red-600' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <span className="text-xs">⚠</span> {errors.email}
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
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-200 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LiaSpinnerSolid className="animate-spin text-xl" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
          </div>

          {/* Google Sign Up Button */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium">
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Sign in
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

export default Register;
