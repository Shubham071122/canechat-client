import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { IoSettings, IoHelpCircle } from 'react-icons/io5';
import { BiLogOut } from "react-icons/bi";
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function HamMenu() {
  const isOpenHam = useSelector((state) => state.hamburger.isOpen);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    const data = await logout();
    if(data == 200){
      navigate("/");
      toast.success("Logout successfull");
    }else{
      toast.error("Something went wrong");
    }
  }

  return (
    <div
      className={`h-full w-full bg-violet-600 dark:bg-slate-500 text-white dark:text-violet-100 transform transition-transform duration-[1200ms] ease-in-out ${
        isOpenHam ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-8 sm:p-10 w-full flex flex-col items-start justify-start gap-2 sm:gap-3">
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
        <button 
        className='w-full mb-2 text-base sm:text-lg flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-300 dark:hover:bg-blue-500'
        onClick={handleLogout}><BiLogOut className="text-xl sm:text-2xl" />Logout</button>
      </div>
    </div>
  );
}

export default HamMenu;
