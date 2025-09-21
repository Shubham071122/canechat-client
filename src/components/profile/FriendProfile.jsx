import React, { useState } from 'react';
import img1 from '../../assets/avatarplaceholder.png';

function FriendProfile() {
  const [fullName] = useState('Rahul Raj');
  const [userName] = useState('rahul_34');

  return (
    <section className="w-full h-screen overflow-y-auto ">
      <div className="h-screen flex flex-col m-3 sm:m-8 bg-gray-100 dark:bg-gray-800 p-5 py-10 sm:p-10 rounded-lg shadow-lg relative">
        <div className="border-2 border-gray-400 rounded-full overflow-hidden w-32 h-32 mb-4 mx-auto">
          <img
            src={img1}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" my-6 flex flex-col gap-2 sm:gap-5 ">
          <div className="flex items-center  gap-3 text-gray-900 dark:text-gray-100 border-y-2 py-5 ">
            <p>Name:</p>
            <p className="w-full text-gray-700 dark:text-gray-300 p-2rounded-md">
              {fullName}
            </p>
          </div>
          <div className="flex gap-3 text-gray-900 dark:text-gray-100  border-b-2 pb-5 ">
            <p>Username:</p>
            <p className="text-gray-700 dark:text-gray-300">{userName}</p>
          </div>
        </div>

        <div className='w-full flex flex-row justify-end mt-10'>
          <button className='py-2 px-4 bg-blue-700 rounded-md text-white text-xl'>+ Add friend</button>
        </div>
      </div>
    </section>
  );
}

export default FriendProfile;
