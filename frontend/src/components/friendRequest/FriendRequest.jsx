import React from 'react';
import img1 from '../../assets/shubham.png';
import { RxCross2 } from 'react-icons/rx';

function FriendRequest() {
  return (
    <section className="w-full h-screen overflow-y-auto">
      <div className="h-auto flex flex-col m-3 sm:m-8 bg-gray-100 dark:bg-gray-800 p-5 py-10 sm:p-10 rounded-lg shadow-lg relative">
        <h2 className="text-xl sm:text-2xl text-blue-800 dark:text-gray-100 font-bold ">
          New Friend Request
        </h2>
        <div className="w-full h-[0.5px] bg-gray-300 mx-auto my-5 sm:my-8"></div>

      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>
        {/* Friend */}
        <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md">
          <div className="flex items-center gap-4">
            <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
              <img
                src={img1}
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Mohit Kumar</p>
              <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">@mohit_08</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100">Accept</button>
            <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400 "><RxCross2 className="text-xl sm:text-2xl"/></button>
          </div>
        </div>


        </div>
      </div>
    </section>
  );
}

export default FriendRequest;
