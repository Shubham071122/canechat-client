import React, { useEffect, useState } from 'react';
import Logo from '../assets/ce-logo.png';
import avatarPlaceholder from '../assets/avatarplaceholder.png'
import { FcGoogle } from 'react-icons/fc';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userName: '',
    password: '',
    avatar: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required!';
    if (!formData.email) newErrors.email = 'Email is required!';
    if (!formData.userName) newErrors.userName = 'Username is required!';
    if (!formData.password) newErrors.password = 'Password is required!';
    if (!formData.avatar) newErrors.avatar = 'Avatar is required!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(!validateForm()){
      toast.error("Fill all required fields!")
      setLoading(false);
      return;
    }
    console.log(formData);
  }

  return (
    <section className="relative w-full h-screen min-h-screen gap-10">
      <Navbar />
      <div className="w-full h-screen flex items-center justify-center text-black px-4 sm:px-0 bg-blue-300 dark:bg-slate-600 transition-colors">
        <div className="border-2 w-full sm:w-4/12 py-10 px-8 sm:px-12 rounded-3xl shadow-2xl bg-white sm:mt-72  dark:bg-slate-800 transition-colors">
          <div className="w-full flex flex-col items-center">
            <img src={Logo} alt="logo" className="w-16 h-16" />
            <h2 className="text-gray-600 dark:text-gray-50 font-semibold text-2xl mt-3">
              Create New Account!
            </h2>
          </div>
          <div className="mt-7 mb-2 ">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter fullname"
              required
              className="w-full px-4 py-4 rounded-xl outline-blue-900  text-xl text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 transition-colors"
            />
            {errors.fullName && <span  className="text-red-500 italic text-xs font-sans ml-2">{errors.fullName}</span>}
            <input
              type="text"
              name='email'
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl outline-blue-900 text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 transition-colors text-xl mt-4"
            />
            {errors.email && <span  className="text-red-500 italic text-xs font-sans ml-2">{errors.email}</span>}
            <input
              type="text"
              name='userName'
              placeholder="Enter username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl outline-blue-900 text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 transition-colors text-xl mt-4"
            />
            {errors.userName && <span  className="text-red-500 italic text-xs font-sans ml-2">{errors.userName}</span>}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name='password'
                value={useState.password}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl outline-blue-900 text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 transition-colors text-xl mt-4"
              />
              {errors.password && <span  className="text-red-500 italic text-xs font-sans ml-2">{errors.password}</span>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 text-lg mb-5"
              >
                {showPassword ? <BsFillEyeSlashFill className='text-2xl'/> : <BsFillEyeFill className='text-2xl' />}
              </button>
            </div>
            <label className="text-gray-600 text-lg block mb-2 mt-5" htmlFor="avatar">
              Avatar :
            </label>
            <div className="mb-5 w-full flex items-center justify-center flex-col">
              <div
                className="w-32 h-32 rounded-full border-2 border-gray-300 cursor-pointer overflow-hidden relative bg-center bg-cover"
                style={{
                  backgroundImage: formData.avatar
                    ? `url(${URL.createObjectURL(formData.avatar)})`
                    : `url(${avatarPlaceholder})`,
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
                  required
                />
              </div>
              {errors.avatar && (
                <span className="text-red-500 italic text-xs font-sans ml-2">{errors.avatar}</span>
              )}
            </div>
            <button 
            type='submit'
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex flex-row justify-center items-center bg-blue-700 text-white font-medium text-2xl py-3 rounded-xl hover:transition-all 300ms ease-in-out hover:bg-blue-600 mt-10">
              {loading ? (
                <LiaSpinnerSolid className="animate-spin text-3xl" />
              ) : (
                'SignIn'
              )}
            </button>
          </div>
          <p className="w-full flex flex-row justify-center text-sm text-gray-500 mb-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 ml-1">
              Sign In
            </Link>
          </p>
          <div className="w-full flex flex-row justify-center items-center">
            <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
            <p className="mx-2 text-gray-400 text-sm font-thin">OR</p>
            <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
          </div>
          <button className="w-full flex flex-row justify-center items-center mt-3">
            <FcGoogle className="text-4xl" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
