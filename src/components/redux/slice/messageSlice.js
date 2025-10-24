// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// //Fetch messages between users:
// export const fetchMessages = createAsyncThunk(
//   'messages/fetchMessages',
//   async ({ userId, recipientId }) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_SERVER_URL}/messages/all-message`,
//       { userId, friendUserId: recipientId },
//       { withCredentials: true },
//     );
//     console.log("response fetch all msg:",response);
//     return response.data.data;
//   },
// );

// //Send a new message:
// export const sendMessage = createAsyncThunk(
//   'messages/sendMessage',
//   async ({ userId, recipientId, message }) => {

//     const response = await axios.post(
//       `${import.meta.env.VITE_SERVER_URL}/messages/c/message`,
//       {
//         sender: userId,
//         recipient: recipientId,
//         message,
//       },
//       { withCredentials: true },
//     );

//     console.log("response send msg:",response);
//     return response.data.message;
//   },
// );

// const messageSlice = createSlice({
//   name: 'messages',
//   initialState: {
//     messages: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     addMessage: (state, action) => {
//       state.messages.push(action.payload);
//     },
//     // Add optimistic message before API call
//     addOptimisticMessage: (state, action) => {
//       const optimisticMessage = {
//         ...action.payload,
//         _id: `temp-${Date.now()}`, // Temporary ID
//         createdAt: new Date().toISOString(),
//         isOptimistic: true
//       };
//       state.messages.push(optimisticMessage);
//     },
//     // Remove optimistic message and replace with real one
//     replaceOptimisticMessage: (state, action) => {
//       const { tempId, realMessage } = action.payload;
//       const index = state.messages.findIndex(msg => msg._id === tempId);
//       if (index !== -1) {
//         state.messages[index] = realMessage;
//       }
//     }
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMessages.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchMessages.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         console.log("fulfilled:",action.payload);
//         state.messages = action.payload;
//       })
//       .addCase(fetchMessages.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(sendMessage.pending, (state, action) => {
//         // Optimistically add the message to UI immediately
//         const tempId = `temp-${Date.now()}-${Math.random()}`;
//         const optimisticMessage = {
//           sender: action.meta.arg.userId,
//           recipient: action.meta.arg.recipientId,
//           message: action.meta.arg.message,
//           messageId: tempId,
//           _id: tempId,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           senderUserName: action.meta.arg.senderUserName,
//           recipientUserName: action.meta.arg.recipientUserName,
//           isOptimistic: true,
//           tempId: tempId // Keep reference for easier removal
//         };
//         console.log("Adding optimistic message:", optimisticMessage);
//         console.log("Current user sending:", action.meta.arg.senderUserName);
//         state.messages.push(optimisticMessage);
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         // Remove ALL optimistic messages and add the real one
//         const beforeCount = state.messages.length;
//         state.messages = state.messages.filter(msg => !msg.isOptimistic);
//         const afterCount = state.messages.length;
//         console.log(`Removed ${beforeCount - afterCount} optimistic messages`);
//         console.log("Real message from server:", action.payload);

//         // Check if this message already exists (to prevent duplicates)
//         const existingMessage = state.messages.find(msg => 
//           msg.messageId === action.payload.messageId || msg._id === action.payload._id
//         );

//         if (!existingMessage) {
//           state.messages.push(action.payload);
//           console.log("Added new message to state");
//         } else {
//           console.log("Message already exists, skipping duplicate");
//         }
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         // Remove ALL optimistic messages if send failed
//         state.messages = state.messages.filter(msg => !msg.isOptimistic);
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addMessage, addOptimisticMessage, replaceOptimisticMessage } = messageSlice.actions;
// export default messageSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// =================== Thunks =================== //

// Fetch messages between users
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ userId, recipientId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/messages/all-message`,
      { userId, friendUserId: recipientId },
      { withCredentials: true },
    );
    return response.data.data;
  },
);

// Send a new message (REST)
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ userId, recipientId, message, tempId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/messages/c/message`,
      { sender: userId, recipient: recipientId, message },
      { withCredentials: true },
    );
    return { message: response.data.message, tempId };
  },
);

// Optional: fetch initial online users
export const fetchOnlineUsers = createAsyncThunk(
  'messages/fetchOnlineUsers',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/users/online`,
      { withCredentials: true },
    );
    return response.data.onlineUsers;
  },
);

// =================== Slice =================== //

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
    onlineUsers: [],
    typingUsers: {}, // { [userId]: true/false }
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addOptimisticMessage: (state, action) => {
      const optimisticMessage = {
        ...action.payload,
        _id: `temp-${Date.now()}-${Math.random()}`,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };
      state.messages.push(optimisticMessage);
    },
    replaceOptimisticMessage: (state, action) => {
      const { tempId, realMessage } = action.payload;
      const index = state.messages.findIndex(msg => msg._id === tempId);
      if (index !== -1) {
        state.messages[index] = realMessage;
      }
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(msg => msg._id !== action.payload);
    },
    markMessageRead: (state, action) => {
      const { messageId } = action.payload;
      const msg = state.messages.find(m => m._id === messageId);
      if (msg) msg.status = 'read';
    },
    setUserOnline: (state, action) => {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },
    setUserOffline: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(id => id !== action.payload);
    },
    setTyping: (state, action) => {
      const { fromUserId, isTyping } = action.payload;
      state.typingUsers[fromUserId] = isTyping;
    },
    setInitialOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetch messages
    builder
      .addCase(fetchMessages.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Send message
    builder
      .addCase(sendMessage.pending, (state, action) => {
        const tempId = `temp-${Date.now()}-${Math.random()}`;
        const optimisticMessage = {
          sender: action.meta.arg.userId,
          recipient: action.meta.arg.recipientId,
          message: action.meta.arg.message,
          _id: tempId,
          tempId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          senderUserName: action.meta.arg.senderUserName,
          recipientUserName: action.meta.arg.recipientUserName,
          isOptimistic: true,
        };
        state.messages.push(optimisticMessage);
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { tempId, message } = action.payload;

        // Remove specific optimistic message
        state.messages = state.messages.filter(msg => msg._id !== tempId);

        // Prevent duplicates
        const exists = state.messages.find(
          msg => msg._id === message._id || msg.messageId === message.messageId,
        );
        if (!exists) state.messages.push(message);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        // Remove specific optimistic messages if send failed
        state.messages = state.messages.filter(msg => !msg.isOptimistic);
        state.error = action.error.message;
      });

    // Fetch online users
    builder.addCase(fetchOnlineUsers.fulfilled, (state, action) => {
      state.onlineUsers = action.payload;
    });
  },
});

// =================== Exports =================== //

export const {
  addMessage,
  addOptimisticMessage,
  replaceOptimisticMessage,
  deleteMessage,
  markMessageRead,
  setUserOnline,
  setUserOffline,
  setTyping,
  setInitialOnlineUsers
} = messageSlice.actions;

export default messageSlice.reducer;
