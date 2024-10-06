import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {io} from 'socket.io-client';

//Initialize socket
const socket = io(import.meta.env.VITE_SERVER_URL, {withCredentials:true});

//Fetch messages between users:
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ userId, recipientId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/messages/all-message`,
      { userId, friendUserId: recipientId },
      { withCredentials: true },
    );
    console.log("response fetch all msg:",response);
    return response.data.data;
  },
);

//Send a new message:
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ userId, recipientId, message }) => {

    socket.emit('sendMessage', {sender:userId, recipient:recipientId,message});

    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/messages/c/message`,
      {
        sender: userId,
        recipient: recipientId,
        message,
      },
      { withCredentials: true },
    );

    console.log("response send msg:",response);
    return response.data.message;
  },
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("fulfilled:",action.payload);
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
