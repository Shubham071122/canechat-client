import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

console.log("Before");
console.log(import.meta.env.VITE_SOCKET_SERVER_URL)
const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
console.log("After");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('messageDeleted', (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId),
      );
    });

    socket.on('messageEdited', (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg,
        ),
      );
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('messageDeleted');
      socket.off('messageEdited');
    };
  }, [chatId]);

  const sendMessage = (message) => {
    socket.emit('sendMessage', { ...message, chatId });
  };

  const deleteMessage = (messageId) => {
    socket.emit('deleteMessage', { messageId, chatId });
  };

  const editMessage = (messageId, newMessageContent) => {
    socket.emit('editMessage', { messageId, newMessageContent, chatId });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <MessageList messages={messages} deleteMessage={deleteMessage} editMessage={editMessage} />
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  )


};

export default Chat