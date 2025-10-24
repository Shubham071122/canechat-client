import React, { useEffect, useRef } from 'react';

const Messages = ({ messages, currentUser, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if(messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
             date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="h-full px-4 py-2 space-y-4">
      {/* Empty State - Start Conversation */}
      {(!messages || messages.length === 0) && (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">          
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No messages yet
          </h3>
          
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
            Start the conversation with a friendly message
          </p>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onSendMessage("👋 Hello!")}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full transition-colors"
            >
              👋 Hello!
            </button>
            <button 
              onClick={() => onSendMessage("Hi there! 😊")}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm px-4 py-2 rounded-full transition-colors"
            >
              Hi there! 😊
            </button>
          </div>
        </div>
      )}      {/* Messages */}
      {messages?.map((msg, index) => {
        const isMyMessage = msg.sender === currentUser || msg.senderUserName === currentUser;
        const showAvatar = index === 0 || 
          (messages[index - 1] && 
           (messages[index - 1].senderUserName !== msg.senderUserName || 
            messages[index - 1].sender !== msg.sender));
        
        return (
          <div key={msg._id || msg.messageId} className={`flex items-end space-x-2 ${isMyMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>

            {/* {!isMyMessage && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">
                  {(msg.senderUserName || 'U')[1]?.toUpperCase() || 'U'}
                </span>
              </div>
            )} */}
            
            {/* Message bubble */}
            <div className={`group max-w-xs lg:max-w-md ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}>
              <div
                className={`px-4 py-2 rounded-2xl shadow-sm ${
                  isMyMessage
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed break-words">{msg.message}</p>
              </div>
              
              {/* Timestamp */}
              <div className={`flex mt-1 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
