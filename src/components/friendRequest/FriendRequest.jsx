import React, { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaUserPlus, FaUsers, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
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
    console.log("reqid:", requestId);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/accept-request`,
        { requestId }, 
        { withCredentials: true } 
      );
      if (response.status === 200) {
        console.log("res ac:", response);
        // Remove the accepted request from the list
        setFriendRequests(prev => prev.filter(req => req._id !== requestId));
        toast.success('Friend request accepted!');
      }
    } catch (error) {
      console.log('Error while accepting friend requests:', error);
      toast.error('Something went wrong!');
    }
  };

  const handleFriendRequestReject = async (requestId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/friend/reject-request`,
        { requestId },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setFriendRequests(prev => prev.filter(req => req._id !== requestId));
        toast.success('Friend request rejected!');
      }
    } catch (error) {
      console.log('Error while rejecting friend request:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <section className="w-full h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <IoArrowBack className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Friend Requests</h1>
        <div className="w-9"></div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
        {/* Header Info */}
        <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FaUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              New Friend Requests
            </h2>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {friendRequests.length} pending request{friendRequests.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Friend Requests List */}
        <div className="space-y-4">
          {friendRequests.length > 0 ? (
            friendRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500 shadow-md">
                        <img
                          src={request.fromUser.avatar}
                          alt="avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/src/assets/avatarplaceholder.png';
                          }}
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {request.fromUser.fullName}
                        </h3>
                        <FaCheckCircle className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {request.fromUser.userName}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Wants to connect with you
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFriendRequestAccept(request._id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaCheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Accept</span>
                    </button>
                    
                    <button
                      onClick={() => handleFriendRequestReject(request._id)}
                      className="p-2 bg-gray-200 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-900 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <FaUserPlus className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Friend Requests
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                You don't have any pending friend requests at the moment. 
                New requests will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FriendRequest;
