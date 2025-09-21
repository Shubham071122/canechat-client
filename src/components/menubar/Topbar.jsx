import React, { useState } from 'react';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHam } from '../redux/slice/hamSlice';
import { IoSearch } from 'react-icons/io5';
import { useSearch } from '../../context/SearchContext.jsx';

function Topbar() {
  const dispatch = useDispatch();
  const isOpenHam = useSelector((state) => state.hamburger.isOpen);
  const {query,setQuery} = useSearch();
  // console.log("search:",query);

  const handleSearchQuery = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="w-full flex flex-row items-center justify-between gap-3 px-4 py-3">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out"
          onClick={() => {
            console.log('Hamburger Button Clicked');
            dispatch(toggleHam());
          }}
        >
          {isOpenHam ? (
            <RxCross2 className="text-2xl text-gray-700 dark:text-gray-300" />
          ) : (
            <RxHamburgerMenu className="text-2xl text-gray-700 dark:text-gray-300" />
          )}
        </button>
        
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
              value={query}
              onChange={handleSearchQuery}
              autoComplete="off"
            />
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
