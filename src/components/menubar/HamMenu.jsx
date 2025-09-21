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
      className={`h-full w-full relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transform transition-transform duration-300 ease-in-out shadow-2xl ${
        isOpenHam ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Menu</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Can-e-Chat</p>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4 space-y-2">
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`
            }
          >
            <FaUser className="text-lg" />
            <span>Profile</span>
          </NavLink>
          
          <NavLink
            to="/user/friend-request"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`
            }
          >
            <FaUserPlus className="text-lg" />
            <span>Friend Requests</span>
          </NavLink>
          
          <NavLink
            to="/user/settings"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`
            }
          >
            <IoSettings className="text-lg" />
            <span>Settings</span>
          </NavLink>
          
          <NavLink
            to="/user/help"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`
            }
          >
            <IoHelpCircle className="text-lg" />
            <span>Help & Support</span>
          </NavLink>

          {/* Theme Toggle */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
              <div className="flex items-center gap-4">
                {darkMode ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  darkMode ? 'bg-blue-500' : 'bg-gray-300'
                }`}></span>
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out transform ${
                    darkMode ? 'translate-x-6' : ''
                  }`}
                ></span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            className="w-full flex items-center gap-4 p-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            onClick={handleLogout}
          >
            <BiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
          
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 Can-e-Chat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HamMenu;
