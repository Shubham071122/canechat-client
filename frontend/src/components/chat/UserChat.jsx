import React, {useState} from 'react';
import { IoCall } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import img1 from '../../assets/ce-logo.png';
import MessageInput from './MessageInput';
import PopupMenu from './PopupMenu';

function UserChat() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <section className="w-full h-[95vh] sm:h-[91vh] p-1 flex flex-col">
        {/* Profile bar */}
        <div className="w-full bg-gray-200 shadow-md dark:bg-slate-600 border border-blue-400 flex flex-row justify-between items-center py-2 px-6 rounded-2xl relative">
          <div className="flex items-center gap-4">
            <div className="border-[3px] rounded-full w-10 h-10 border-gray-400 dark:border-gray-200 flex items-center justify-center">
              <img
                src={img1}
                alt="profile"
                className="w-8 h-8 object-cover object-center rounded-full"
              />
            </div>
            <p className="text-xl font-semibold ">
              Username
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button>
              <IoCall className="text-2xl text-gray-600 dark:text-gray-300" />
            </button>
            <button onClick={() => setShowPopup(!showPopup)}>
              <BsThreeDotsVertical className="text-2xl text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          {/* Pop-up menu */}
          {showPopup && (
            <PopupMenu 
              onClose={() => setShowPopup(false)} // close popup when clicked outside
            />
          )}
        </div>
        <div className='flex-grow'></div>
        {/* Input box */}
        <div>
          <MessageInput/>
        </div>
      </section>
    </>
  );
}

export default UserChat;
