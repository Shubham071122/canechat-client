import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { BsSendFill, BsEmojiLaughing } from 'react-icons/bs';
import TextareaAutosize from 'react-textarea-autosize'; 
import toast from 'react-hot-toast';

function MessageInput({onSendMessage}) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const emojiPickerRef = useRef(null);

  // Handle adding emoji to the message
  const onEmojiClick = (emojiData) => {
    if (emojiData && emojiData.emoji) {
      setMessage((prevMessage) => prevMessage + emojiData.emoji);
    } else {
      toast.error("Emoji selection failed!");
      console.error("Emoji selection failed");
    }
  };

  // Handle message input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending the message
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      onSendMessage(message);
      setMessage(''); 
    }
  };

// Handle key press for Shift + Enter and Enter
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      if(e.shiftKey){

      }else{
        e.preventDefault();
        handleSendMessage();
      }
    }
  }

  // Close the emoji picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-end space-x-3 bg-white dark:bg-gray-800">
      {/* Emoji Picker */}
      <div className="relative flex-shrink-0" ref={emojiPickerRef}>
        <button
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <BsEmojiLaughing className='text-xl'/>
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker 
              onEmojiClick={onEmojiClick} 
              theme={isDarkMode ? 'dark' : 'light'}
              emojiStyle='apple'
              defaultSkinTone='neutral'
              lazyLoadEmojis={true}
            />
          </div>
        )}
      </div>

      {/* Message Input Container */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        <TextareaAutosize
          className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          minRows={1}
          maxRows={4}
        />
      </div>

      {/* Send Button */}
      <button
        className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 ${
          message.trim() 
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleSendMessage}
        disabled={!message.trim()}
      >
        <BsSendFill className='text-lg'/>
      </button>
    </div>
  );
}

export default MessageInput;
