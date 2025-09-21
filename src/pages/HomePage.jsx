import React from 'react';
import SidePanel from '../components/menubar/SidePanel';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import lightBg from '../assets/chBg.jpg';
import darkBg from '../assets/chBgD.jpg';


function HomePage() {
  return (
    <section className="w-full h-screen flex flex-col bg-blue-50 dark:bg-gray-950">
      <Navbar />
      <div className="w-full sm:w-8/12 flex-1 mx-auto flex shadow-2xl overflow-hidden pt-16">
        <SidePanel />
        <div className="flex-1 bg-cover bg-center bg-lightBg dark:bg-darkBg">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
