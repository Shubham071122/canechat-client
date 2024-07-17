import React, { useState } from 'react';
import Logo from '../assets/ce-logo.png';
import { FcGoogle } from 'react-icons/fc';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
  const [userData, setUserData] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hadleUserdataChange = (e) => {
    setUserData(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="relative w-full h-screen min-h-screen">
      <Navbar />
      <section className="w-full px-4 sm:px-0 flex items-center justify-center text-black h-full bg-blue-300 dark:bg-slate-600 transition-colors">
        <div className="border-2 w-full sm:w-4/12 py-10 px-8 sm:px-12 rounded-3xl shadow-2xl bg-white dark:bg-slate-800 transition-colors">
          <div className="w-full flex flex-col items-center">
            <img src={Logo} alt="logo" className="w-20 h-20" />
            <h2 className="text-gray-600 dark:text-gray-50 font-semibold text-2xl mt-3 transition-colors">
              Welcome Back Buddy!
            </h2>
          </div>
          <div className="my-7">
            <input
              type="text"
              placeholder="Email or username"
              value={userData}
              onChange={hadleUserdataChange}
              className="w-full px-4 py-4 rounded-xl outline-blue-900 text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 text-xl transition-colors"
            />
            <div className="mt-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-4 rounded-xl outline-blue-900 text-black dark:text-gray-100 bg-violet-100 dark:bg-gray-600 text-xl transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[17px] text-gray-400 text-lg"
              >
                {showPassword ? <BsFillEyeSlashFill className='text-2xl' /> : <BsFillEyeFill className='text-2xl' />}
              </button>
            </div>
            <Link
              to="/forget-password"
              className=" text-blue-400 font-thin ml-1"
            >
              Forget Password?
            </Link>
          </div>
          <button className="w-full flex flex-row justify-center items-center bg-blue-700 text-white font-medium text-2xl py-3 rounded-xl hover:transition-all 300ms ease-in-out hover:bg-blue-600">
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
