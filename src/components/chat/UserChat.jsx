import React, { useEffect, useState } from 'react';
import { IoCall } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useUser } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import {
  addMessage,
  fetchMessages,
  sendMessage,
} from '../redux/slice/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';
import MessageInput from './MessageInput';
import PopupMenu from './PopupMenu';
import Messages from './Messages';

function UserChat() {
  const [socket, setSocket] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const recipientId = useParams().userId;
  const { currentUserId, userData: currentUserData } = useAuth();
  const { fetchUser, getUser, isUserLoading } = useUser();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const messageStatus = useSelector((state) => state.messages.status);

  // Get user data for the recipient
  const userData = getUser(recipientId);
  const userLoading = isUserLoading(recipientId);


  // Connect to Socket.IO
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
    });
    setSocket(newSocket);

    // Clean up when component unmounts
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket && recipientId && currentUserId) {
      // Fetch user data using the new context method
      fetchUser(recipientId);
      
      dispatch(
        fetchMessages({ userId: currentUserId, recipientId: recipientId }),
      );
      // Join the chat room or set up a user connection
      socket.emit('join', currentUserId);

      // Listen for real-time messages
      socket.on('receiveMessage', (message) => {
        dispatch(addMessage(message)); // Update the Redux store with the new message
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [currentUserId, recipientId, dispatch, fetchUser, socket]);


  const handleSendMessage = (newMessage) => {
    console.log("Sending message with data:", {
      userId: currentUserId,
      recipientId: recipientId,
      message: newMessage,
      senderUserName: currentUserData?.userName,
      recipientUserName: userData?.userName
    });
    
    if (currentUserId && recipientId) {
      dispatch(
        sendMessage({
          userId: currentUserId,
          recipientId: recipientId,
          message: newMessage,
          senderUserName: currentUserData?.userName,
          recipientUserName: userData?.userName,
        }),
      );
    }
  };

  const handleDeleteMessage = (messageId) => {
    // dispatch(deleteMessage({ messageId }));
  };

  if (!userData || !recipientId || !currentUserId || userLoading) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        {/* Loading Header Skeleton */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Avatar Skeleton */}
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                {/* Name Skeleton */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
                {/* Status Skeleton */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Action Buttons Skeleton */}
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Messages Area */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 px-4 py-4">
          <div className="space-y-4">
            {/* Message Skeleton 1 (other user) */}
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="max-w-xs">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse w-40"></div>
              </div>
            </div>

            {/* Message Skeleton 2 (current user) */}
            <div className="flex items-end space-x-2 flex-row-reverse">
              <div className="max-w-xs">
                <div className="h-12 bg-blue-200 dark:bg-blue-800 rounded-2xl animate-pulse ml-auto w-48"></div>
              </div>
            </div>

            {/* Message Skeleton 3 (other user) */}
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="max-w-xs">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse w-32"></div>
              </div>
            </div>

            {/* Message Skeleton 4 (current user) */}
            <div className="flex items-end space-x-2 flex-row-reverse">
              <div className="max-w-xs">
                <div className="h-14 bg-blue-200 dark:bg-blue-800 rounded-2xl animate-pulse ml-auto w-56"></div>
              </div>
            </div>

            {/* Message Skeleton 5 (other user) */}
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="max-w-xs">
                <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse w-36"></div>
              </div>
            </div>

            {/* Message Skeleton 6 (current user) */}
            <div className="flex items-end space-x-2 flex-row-reverse">
              <div className="max-w-xs">
                <div className="h-11 bg-blue-200 dark:bg-blue-800 rounded-2xl animate-pulse ml-auto w-44"></div>
              </div>
            </div>

            {/* Message Skeleton 7 (other user) */}
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="max-w-xs">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse w-28"></div>
              </div>
            </div>

            {/* Message Skeleton 8 (current user) */}
            <div className="flex items-end space-x-2 flex-row-reverse">
              <div className="max-w-xs">
                <div className="h-13 bg-blue-200 dark:bg-blue-800 rounded-2xl animate-pulse ml-auto w-52"></div>
              </div>
            </div>

            {/* Message Skeleton 9 (other user) */}
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="max-w-xs">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse w-38"></div>
              </div>
            </div>
          </div>

          {/* Loading indicator with text */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading chat...</span>
            </div>
          </div>
        </div>

        {/* Loading Input Area Skeleton */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-end space-x-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-100 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={userData.avatar}
                alt={userData.fullName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-green-500"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {userData.fullName}
              </h3>
              <p className="text-sm text-green-500 font-medium">Online</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <IoCall className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={() => setShowPopup(!showPopup)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            >
              <BsThreeDotsVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          
          {/* Pop-up menu */}
          {showPopup && (
            <div className="absolute right-4 top-16 z-50">
              <PopupMenu userData={userData} onClose={() => setShowPopup(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <Messages
          messages={messages}
          currentUser={currentUserData?.userName}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>

      {/* Input Area - Conditional based on block status */}
      {userData.isBlocked ? (
        <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 mt-2">
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You blocked this contact
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 mt-2">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}

export default UserChat;
