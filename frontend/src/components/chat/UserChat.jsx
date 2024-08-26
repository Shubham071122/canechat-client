import React from 'react';
import { IoCall } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import img1 from '../../assets/ce-logo.png';

function UserChat() {
  return (
    <>
      <section className="w-full ">
        {/* Profile bar */}
        <div className="w-full bg-gray-200 dark:bg-slate-800 flex flex-row justify-between items-center py-3 px-4">
          <div className="flex items-center gap-4">
            <div className="border-[3px] rounded-full w-12 h-12 border-gray-400 dark:border-gray-200 flex items-center justify-center">
              <img
                src={img1}
                alt="profile"
                className="w-10 h-10 object-cover object-center rounded-full"
              />
            </div>
            <p className="text-xl font-semibold ">Mohit</p>
          </div>
          <div className="flex items-center gap-5">
            <button>
              <IoCall className="text-2xl text-gray-600" />
            </button>
            <button>
              <BsThreeDotsVertical className="text-2xl text-gray-600" />
            </button>
          </div>
        </div>
        <div></div>
        <div></div>
      </section>
    </>
  );
}

export default UserChat;
