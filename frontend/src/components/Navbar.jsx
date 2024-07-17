import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import Logo from '../assets/ce-logo.png';

function Navbar() {
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

  return (
    <div className={`top-0 w-full py-2 sm:py-4 bg-white dark:bg-gray-800 transition-colors sticky z-10 ${
      darkMode ? 'nav-shad-dark' : 'nav-shad-light'
    }`}>
      <div className="w-11/12 sm:10/12 flex flex-row justify-between items-center mx-auto">
        <Link to="/" className="flex items-center justify-center gap-3">
          <div className="w-8 sm:w-12 h-8 sm:h-10">
            <img src={Logo} alt="logo" />
          </div>
          <h3 className="font-bold text-xl sm:text-3xl text-violet-900 dark:text-violet-300 transition-colors">
            Can'e Chat
          </h3>
        </Link>
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
    </div>
  );
}

export default Navbar;
