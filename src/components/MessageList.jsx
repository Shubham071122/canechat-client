// import React from 'react'

// function MessageList({ messages, deleteMessage, editMessage }) {

//     const handleDelete = (messageId) => {
//         deleteMessage(messageId);
//       };
    
//       const handleEdit = (messageId) => {
//         const newMessageContent = prompt('Enter new message content:');
//         if (newMessageContent) {
//           editMessage(messageId, newMessageContent);
//         }
//       };

//   return (
//     <div className="overflow-y-auto max-h-96">
//       {messages.map((message) => (
//         <div key={message._id} className="p-2 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <div>
//               <strong>{message.sender}</strong>: {message.message}
//               {message.edited && <span className="text-sm text-gray-500 ml-2">(edited)</span>}
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleDelete(message._id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleEdit(message._id)}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default MessageList