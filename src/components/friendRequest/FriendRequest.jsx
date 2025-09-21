import React, { useState, useEffect } from 'react';
import img1 from '../../assets/shubham.png';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';

function FriendRequest() {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/friend/get-allFriend-request`,
          { withCredentials: true },
        );

        if (response.status === 200) {
          setFriendRequests(response.data.data);
        }
      } catch (error) {
        console.log('Error while fetching friend requests:', error);
        toast.error('Failed to load friend requests.');
      }
    };

    fetchFriendRequests();
  }, []);

  const handleFriendRequestAccept = async (requestId) => {
    console.log("reqid:",requestId);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/accept-request`,
        { requestId }, 
      { withCredentials: true } 
      );
      if(response.status === 200){
        console.log("res ac:",response);
      }
    } catch (error) {
      console.log('Error while accepting friend requests:', error);
        toast.error('Something went wrong!');
    }
  };

  return (
    <section className="w-full h-screen overflow-y-auto">
      <div className="h-auto flex flex-col m-3 sm:m-8 bg-gray-100 dark:bg-gray-800 p-5 py-10 sm:p-10 rounded-lg shadow-lg relative">
        <h2 className="text-xl sm:text-2xl text-blue-800 dark:text-gray-100 font-bold ">
          New Friend Requests
        </h2>
        <div className="w-full h-[0.5px] bg-gray-300 mx-auto my-5 sm:my-8"></div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {friendRequests.length > 0 ? (
            friendRequests.map((request) => (
              <div
                key={request._id}
                className="flex items-center justify-between bg-slate-300 dark:bg-slate-500 p-2 sm:p-4 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <div className="border-[3px] overflow-hidden rounded-full w-14 h-14 border-gray-400 dark:border-gray-200">
                    <img
                      src={request.fromUser.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {request.fromUser.fullName}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-800">
                      {request.fromUser.userName}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-4">
                  <button
                    onClick={() => handleFriendRequestAccept(request._id)}
                    className="py-1 sm:py-2 px-2 sm:px-4 bg-blue-700 rounded-md text-gray-100"
                  >
                    Accept
                  </button>
                  <button className="p-1 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400">
                    <RxCross2 className="text-xl sm:text-2xl" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300 text-center">
              No new friend requests.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FriendRequest;
