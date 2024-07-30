import React from 'react';
import { RxHamburgerMenu,RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector  } from 'react-redux';
import { toggleHam } from '../redux/slice/hamSlice';

function Topbar() {
  const dispatch = useDispatch();
  const isOpenHam = useSelector((state) => state.hamburger.isOpen);
  console.log("Hamburget menu state:",isOpenHam);

  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center justify-between gap-5 px-4 py-4 bg-gray-200 dark:bg-slate-800">
      <button
      className='transition-all 300s ease-in-out'
      onClick={() => {
        console.log("Hamburger Button Clicked");
        dispatch(toggleHam())}
        
      }>
          {isOpenHam ? (
            <RxCross2 className="text-3xl font-bold text-black dark:text-gray-300 " />
          ) : (
            <RxHamburgerMenu className="text-3xl font-bold text-black dark:text-gray-300" />
          )}
        </button>
        <div className="w-full">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-full outline-none bg-white dark:bg-gray-300 text-black dark:text-gray-700"
          />
        </div>
      </div>
      <div className="w-full h-[1.5px] bg-gray-400"></div>
    </div>
  );
}

export default Topbar;
