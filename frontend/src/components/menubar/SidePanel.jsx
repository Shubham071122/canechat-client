import React from 'react';
import Topbar from '../menubar/Topbar';
import FriendList from './FriendList';
import { useSelector } from 'react-redux';
import HamMenu from './HamMenu';

function SidePanel() {
  const isOpenHam = useSelector((state) => state.hamburger.isOpen);
  console.log('SidePanel:', isOpenHam);
  return (
    <div className="w-full sm:w-4/12 h-full bg-gray-100 dark:bg-slate-700 transition-colors relative overflow-hidden">
      <Topbar />
      <div className="relative h-full">
        {/* HamMenu sliding in from the left */}
        <div
          className={`absolute inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-10 ${
            isOpenHam ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '100%' }}
        >
          <HamMenu />
        </div>

        {/* FriendList always visible but non-interactive when HamMenu is open */}
        <div
          className={`h-full transition-opacity duration-300 ease-in-out ${
            isOpenHam ? 'opacity-100 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          <FriendList />
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
