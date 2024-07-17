import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

function Topbar() {
    const [openHam,setOpenHam] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex flex-row items-center justify-between gap-5 px-4 py-4 bg-gray-200 dark:bg-slate-800 transition-colors">
        <button>
          <RxHamburgerMenu
          onClick={() => setOpenHam(!openHam)}
          className="text-3xl font-bold text-black dark:text-gray-300 transition-colors" />
        </button>
        <div className="w-full">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className=" w-full px-4 py-2 rounded-full outline-none bg-white dark:bg-gray-300 text-black dark:text-gray-70 transition-colors"
          />
        </div>
      </div>
      <div className='w-full h-[1.5px] bg-gray-400'></div>
    </div>
  );
}

export default Topbar;
