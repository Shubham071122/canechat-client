import React, { useEffect, useRef } from 'react';

const Messages = ({ messages,currentUser }) => {

  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   scrollToBottom();
  // },[messages]);

  // const scrollToBottom = () => {
  //   if(messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

  return (
    <div className="h-full p-4">
      {messages?.map((msg) => (
        <div
          key={msg.messageId} 
          className={`mb-4 p-2 max-w-xs ${
            msg.senderUserName === currentUser
            ? 'bg-gray-400 text-black self-start mr-auto rounded-tr-lg rounded-br-lg rounded-bl-2xl' // Received messages: Left-aligned, gray background
            : 'bg-blue-500 text-white self-end ml-auto rounded-tl-lg rounded-bl-lg rounded-tr-2xl'// Sent messages: Right-aligned, blue background
          }`}
        >
          <p className="text-sm">{msg.message}</p>
          <span className={`text-xs text-gray-200 ${msg.senderUserName === currentUser
              ? 'text-gray-500 dark:text-gray-700'
              : 'text-gray-300 dark:text-200' 
            }`
              }>
            {new Date(msg.createdAt).toLocaleTimeString()}
          </span>
        </div>
      ))}
      {/* Ref to scroll into view */}
      {/* <div ref={messagesEndRef} /> */}
    </div>
  );
};

export default Messages;
