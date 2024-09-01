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
    <div className="w-full">
      <div className="w-full flex flex-row items-center justify-between gap-3 px-4 py-4 bg-gray-200 dark:bg-slate-800">
        <button
          className="transition-all 300s ease-in-out"
          onClick={() => {
            console.log('Hamburger Button Clicked');
            dispatch(toggleHam());
          }}
        >
          {isOpenHam ? (
            <RxCross2 className="text-3xl font-bold text-black dark:text-gray-300 " />
          ) : (
            <RxHamburgerMenu className="text-3xl font-bold text-black dark:text-gray-300" />
          )}
        </button>
        <div className="w-full relative">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full text-base font-semibold outline-none bg-white dark:bg-gray-200 text-black dark:text-gray-700"
            value={query}
            onChange={handleSearchQuery}
            autoComplete="off"
          />
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-xl" />
        </div>
      </div>
      <div className="w-full h-[1.5px] bg-gray-400"></div>
    </div>
  );
}

export default Topbar;
