import React, { useEffect, useRef } from 'react';
import Topbar from '../menubar/Topbar';
import FriendList from './FriendList';
import { useDispatch, useSelector } from 'react-redux';
import HamMenu from './HamMenu';
import { closeHam } from '../redux/slice/hamSlice';
import { useSearch } from '../../context/SearchContext';
import SearchSuggestions from './SearchSuggestions';

function SidePanel() {
  const isOpenHam = useSelector((state) => state.hamburger.isOpen);
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const { searchResults } = useSearch();

  const handleClickOutside = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      dispatch(closeHam());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="w-0 sm:w-4/12 h-full bg-white dark:bg-gray-800 transition-colors relative overflow-hidden border-r border-gray-200 dark:border-gray-700 flex flex-col"
    >
      <Topbar />
      <div className="relative flex-1 overflow-hidden">
        {/* HamMenu sliding in from the left */}
        <div
          className={`absolute inset-0 transform transition-transform duration-300 ease-in-out z-10 bg-white dark:bg-gray-800 ${
            isOpenHam ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <HamMenu />
        </div>

        {/* FriendList always visible but non-interactive when HamMenu is open */}
        <div
          className={`h-full transition-opacity duration-300 ease-in-out ${
            isOpenHam
              ? 'opacity-100 pointer-events-none'
              : 'opacity-100 pointer-events-auto'
          }`}
        >
          <FriendList />
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
