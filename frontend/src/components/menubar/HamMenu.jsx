import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { IoSettings, IoHelpCircle } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { FaSun, FaMoon } from 'react-icons/fa';

function HamMenu() {
  const isOpenHam = useSelector((state) => state.hamburger.isOpen);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    const data = await logout();
    if (data == 200) {
      navigate('/');
      toast.success('Logout successfull');
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <div
      className={`h-full w-full relative bg-violet-600 dark:bg-slate-500 text-white dark:text-violet-100 transform transition-transform duration-[1200ms] ease-in-out ${
        isOpenHam ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-8 sm:p-10 w-full flex flex-col items-start justify-start gap-2 sm:gap-3 ">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `w-full mb-2 text-base sm:text-lg flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ease-in-out ${
              isActive
                ? 'bg-blue-400 dark:bg-blue-600'
                : 'hover:bg-blue-300 dark:hover:bg-blue-500'
            }`
          }
        >
          <FaUser className="text-lg sm:text-xl" />
          Profile
        </NavLink>
        <NavLink
          to="/friend-request"
          className={({ isActive }) =>
            `w-full mb-2 text-base sm:text-lg flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ease-in-out ${
              isActive
                ? 'bg-blue-400 dark:bg-blue-600'
                : 'hover:bg-blue-300 dark:hover:bg-blue-500'
            }`
          }
        >
          <FaUserPlus className="text-xl sm:text-2xl" />
          Friend Request
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-full mb-2 text-base sm:text-lg flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ease-in-out ${
              isActive
                ? 'bg-blue-400 dark:bg-blue-600'
                : 'hover:bg-blue-300 dark:hover:bg-blue-500'
            }`
          }
        >
          <IoSettings className="text-xl sm:text-2xl" />
          Settings
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `w-full mb-2 text-base sm:text-lg flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ease-in-out ${
              isActive
                ? 'bg-blue-400 dark:bg-blue-600'
                : 'hover:bg-blue-300 dark:hover:bg-blue-500'
            }`
          }
        >
          <IoHelpCircle className="text-xl sm:text-2xl" />
          Help
        </NavLink>
        <div className="w-full flex items-center justify-between">
          <p className='w-full text-base sm:text-lg flex items-center p-3'>Theme</p>
          <div>
          <label className="relative inline-block w-10 h-6 sm:w-14 sm:h-8 cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="opacity-0 w-0 h-0"
            />
            <span className="absolute inset-0 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors"></span>
            <span
              className={`absolute left-1 top-1 w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out transform ${
                darkMode ? 'translate-x-4 sm:translate-x-6' : ''
              }`}
            >
              {darkMode ? (
                <FaSun className="text-yellow-500 w-3 h-3 sm:w-5 sm:h-5" />
              ) : (
                <FaMoon className="text-gray-900 dark:text-gray-100 w-3 h-3 sm:w-5 sm:h-5" />
              )}
            </span>
          </label>
        </div>
        </div>
        <button
          className="w-full mb-2 text-base sm:text-lg flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-300 dark:hover:bg-blue-500"
          onClick={handleLogout}
        >
          <BiLogOut className="text-xl sm:text-2xl" />
          Logout
        </button>

        <p className='text-xs text-center absolute bottom-36 left-32'>Copyright © 2024</p>
      </div>
    </div>
  );
}

export default HamMenu;
