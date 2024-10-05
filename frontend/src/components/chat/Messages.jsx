import React from 'react';

const Messages = ({ messages,currentUser }) => {
  return (
    <div className="h-full p-4">
      {messages?.map((msg) => (
        <div
          key={msg.messageId}  // Assuming 'messageId' is the unique identifier
          className={`mb-4 p-2 max-w-xs ${
            msg.senderUserName === currentUser
            ? 'bg-gray-300 text-black self-start mr-auto rounded-tr-lg rounded-br-lg rounded-bl-2xl' // Received messages: Left-aligned, gray background
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
    </div>
  );
};

export default Messages;
