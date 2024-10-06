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
    <div className="flex items-center p-2 px-3 bg-violet-400 dark:bg-slate-700 rounded-3xl">
      {/* Emoji Picker */}
      <div className="relative" ref={emojiPickerRef}>
        <button
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 pt-1"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <BsEmojiLaughing className='text-xl'/>
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-12 -left-2">
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

      {/* Auto-Resizing Textarea */}
      <TextareaAutosize
        className="flex-1 mx-2 px-3 py-2 rounded-md focus:outline-none dark:bg-slate-600 dark:text-gray-100"
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        minRows={1}
        maxRows={5} 
        style={{ resize: 'none' }} 
      />

      {/* Send Button */}
      <button
        className="px-3 py-3 text-blue-500 dark:text-gray-50 hover:bg-blue-200 dark:hover:bg-blue-400 rounded-full transition-colors 200ms ease-in-out"
        onClick={handleSendMessage}
      >
        <BsSendFill className='text-2xl'/>
      </button>
    </div>
  );
}

export default MessageInput;
