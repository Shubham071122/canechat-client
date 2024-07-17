import React from 'react';
import FriendList from '../components/menubar/FriendList';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <section className="w-full h-[100vh] flex flex-col bg-blue-300 dark:bg-gray-950 transition-colors overflow-y-hidden">
      <Navbar />
      <div className="w-full sm:w-8/12 h-full mx-auto flex flex-col justify-between items-center shadow-2xl ">
        <div className="w-full flex flex-1 overflow-hidden">
          <FriendList />
          <div className="flex-grow flex-1 overflow-y-auto bg-red-300 ">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
