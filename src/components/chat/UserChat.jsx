import React, { useEffect, useState } from "react";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import {
  addMessage,
  fetchMessages,
  sendMessage,
  setUserOnline,
  setUserOffline,
  setTyping,
  setInitialOnlineUsers
} from "../redux/slice/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import MessageInput from "./MessageInput";
import PopupMenu from "./PopupMenu";
import Messages from "./Messages";

function UserChat() {
  const socket = useSocket();
  const [showPopup, setShowPopup] = useState(false);
  const recipientId = useParams().userId;
  const { currentUserId, userData: currentUserData } = useAuth();
  const { fetchUser, getUser, isUserLoading } = useUser();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const onlineUsers = useSelector((state) => state.messages.onlineUsers);
  const typingUsers = useSelector((state) => state.messages.typingUsers);

  const isRecipientOnline = onlineUsers.includes(recipientId);

  console.log("ONLINE USerS: ", onlineUsers);

  const isTyping = typingUsers[recipientId] || false;

  // Get user data for the recipient
  const userData = getUser(recipientId);
  const userLoading = isUserLoading(recipientId);

  useEffect(() => {
    if (socket && recipientId && currentUserId) {
      fetchUser(recipientId);

      // Fetch previous messages
      dispatch(fetchMessages({ userId: currentUserId, recipientId }));

      // Listen for real-time events
      socket.on("receiveMessage", (message) => {
        // Only add if it's not from current user (to avoid duplicates)
        if (message.sender !== currentUserId) {
          dispatch(addMessage(message));
        }
      });

      // Listen for message delivery confirmation
      socket.on("messageDelivered", ({ messageId, tempId }) => {
        console.log("📬 Message delivered:", { messageId, tempId });
        // Here you could replace the optimistic message with the real one
        // or just update the status
      });

      socket.on("onlineUsersList", (users) => {
        console.log("📋 Initial online users:", users);
        dispatch(setInitialOnlineUsers(users));
      });

      socket.on("userOnline", ({ userId }) => {
        console.log("🟢 User came online:", userId);
        dispatch(setUserOnline(userId));
      });

      socket.on("userOffline", ({ userId }) => {
        console.log("🔴 User went offline:", userId);
        dispatch(setUserOffline(userId));
      });

      socket.on("typing", ({ fromUserId, isTyping }) => {
        console.log("✍️ Typing event:", { fromUserId, isTyping });
        dispatch(setTyping({ fromUserId, isTyping }));
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("messageDelivered");
        socket.off("userOnline");
        socket.off("onlineUsersList");
        socket.off("userOffline");
        socket.off("typing");
      };
    }
  }, [currentUserId, recipientId, dispatch, fetchUser, socket]);

  const handleSendMessage = (newMessage) => {
    if (socket && currentUserId && recipientId) {
      // Stop typing
      socket.emit("typing", { recipient: recipientId, isTyping: false });

      // Create optimistic message for immediate UI update
      const optimisticMessage = {
        _id: `temp-${Date.now()}-${Math.random()}`,
        sender: currentUserId,
        recipient: recipientId,
        message: newMessage,
        senderUserName: currentUserData?.userName,
        recipientUserName: userData?.userName,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };

      // Add optimistic message to UI immediately
      dispatch(addMessage(optimisticMessage));

      // Send via socket (backend will save and emit to recipient)
      socket.emit("sendMessage", {
        sender: currentUserId,
        recipient: recipientId,
        message: newMessage,
        tempId: optimisticMessage._id, // Send temp ID to replace later
      }, (response) => {
        if (response?.success) {
          // Replace optimistic message with real one when backend confirms
          console.log("✅ Message sent successfully");
        } else {
          // Remove optimistic message if failed
          console.error("❌ Message failed:", response?.error);
          // You could dispatch an action to remove the optimistic message here
        }
      });
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
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Loading chat...
              </span>
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
            <div className="relative shrink-0">
              <img
                src={userData.avatar}
                alt={userData.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {isRecipientOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
              )}
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {userData.fullName}
              </h3>
              <div className="relative h-5 overflow-hidden w-[70px]">
                {/* Online/Offline Status */}
                <p
                  className={`text-sm font-medium transition-all duration-300 ease-in-out transform ${
                    isTyping 
                      ? "-translate-y-5 opacity-0" 
                      : "translate-y-0 opacity-100"
                  } ${
                    isRecipientOnline ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {isRecipientOnline ? "Online" : "Offline"}
                </p>
                
                {/* Typing Indicator */}
                <div 
                  className={`absolute top-0 left-0 transition-all duration-300 ease-in-out transform ${
                    isTyping 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-5 opacity-0"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-blue-500 italic font-medium">Typing</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
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
              <PopupMenu
                userData={userData}
                onClose={() => setShowPopup(false)}
              />
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
          <MessageInput 
            onSendMessage={handleSendMessage}
            socket={socket}
            currentUserId={currentUserId}
            recipientId={recipientId}
          />
        </div>
      )}
    </div>
  );
}

export default UserChat;
