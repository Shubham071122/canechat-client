import React from 'react';
import SidePanel from '../components/menubar/SidePanel';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import lightBg from '../assets/chBg.jpg';
import darkBg from '../assets/chBgD.jpg';


function HomePage() {
  return (
    <section className="w-full h-[100vh] flex flex-col bg-blue-300 dark:bg-gray-950 overflow-y-hidden">
      <Navbar />
      <div className="w-full sm:w-8/12 h-full mx-auto flex flex-col justify-between items-center shadow-2xl ">
        <div className="w-full flex flex-1 overflow-hidden">
          <SidePanel />
          <div
            className="flex-grow flex-1 overflow-y-auto bg-cover bg-center bg-lightBg dark:bg-darkBg">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
