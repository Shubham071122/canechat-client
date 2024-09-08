import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/ce-logo.png';

function Navbar() {

  return (
    <div className={`top-0 w-full py-2 sm:py-3 bg-white dark:bg-gray-800 sticky z-10 dark:nav-shad-dark nav-shad-light`}>
      <div className="w-11/12 sm:10/12 flex flex-row justify-between items-center mx-auto">
        <Link to="/" className="flex items-center justify-center gap-3">
          <div className="w-8 sm:w-10 h-8 sm:h-10">
            <img src={Logo} alt="logo" />
          </div>
          <h3 className="font-bold text-lg sm:text-2xl text-violet-900 dark:text-violet-300 transition-colors">
            Can'e Chat
          </h3>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
