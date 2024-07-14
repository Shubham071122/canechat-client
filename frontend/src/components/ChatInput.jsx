// import React, {useState} from 'react'

// function ChatInput({sendMessage }) {

//     const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       sendMessage({ sender: 'YourUserId', recipient: 'RecipientUserId', message });
//       setMessage('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex mt-4">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//         className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none"
//       />
//       <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
//         Send
//       </button>
//     </form>
//   )
// }

// export default ChatInput