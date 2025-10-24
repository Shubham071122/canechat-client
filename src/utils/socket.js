import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_URL, {
      auth: { token },
      withCredentials: true,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};