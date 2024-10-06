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
  const { currentUserId } = useAuth();
  const { getUserDataById, userData } = useUser();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const messageStatus = useSelector((state) => state.messages.status);

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
      getUserDataById(recipientId);
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
  }, [currentUserId, recipientId, dispatch, useParams]);


  const handleSendMessage = (newMessage) => {
    if (currentUserId && recipientId) {
      dispatch(
        sendMessage({
          userId: currentUserId,
          recipientId: recipientId,
          message: newMessage,
        }),
      );
    }
  };

  const handleDeleteMessage = (messageId) => {
    // dispatch(deleteMessage({ messageId }));
  };

  if (!userData || !recipientId || !currentUserId) {
    return <div className=" dark:text-white">Loading user chat...</div>;
  }

  return (
    <>
      <section className="w-full h-[95vh] sm:h-[91vh] p-1 flex flex-col">
        {/* Profile bar */}
        <div className="w-full bg-blue-300 shadow-md dark:bg-slate-600 border border-blue-400 flex flex-row justify-between items-center py-2 px-6 rounded-2xl relative">
          <div className="flex items-center gap-4">
            <div className="border-[3px] rounded-full w-10 h-10 border-gray-200 dark:border-gray-200 flex items-center justify-center">
              <img
                src={userData.avatar}
                alt="profile"
                className="w-8 h-8 object-cover object-center rounded-full"
              />
            </div>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              {userData.fullName}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button>
              <IoCall className="text-2xl text-gray-200 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-200 ease-in-out" />
            </button>
            <button onClick={() => setShowPopup(!showPopup)}>
              <BsThreeDotsVertical className="text-2xl text-gray-200 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors ease-in-out" />
            </button>
          </div>
          {/* Pop-up menu */}
          {showPopup && <PopupMenu onClose={() => setShowPopup(false)} />}
        </div>
        {/* Message Box */}
        <div className="flex-grow overflow-y-auto my-2">
          <Messages
            messages={messages}
            currentUser={userData.userName}
            onDeleteMessage={handleDeleteMessage}
          />
        </div>
        {/* Input box */}
        <div>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </section>
    </>
  );
}

export default UserChat;
