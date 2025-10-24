import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie"; // npm install js-cookie

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { currentUserId } = useAuth();
  const [socket, setSocket] = useState(null);

  console.log("CUSERID: ", currentUserId);
  console.log("URL : ", import.meta.env.VITE_SOCKET_SERVER_URL);

  // useEffect(() => {
  //   if (!currentUserId ) return;

  //   // ✅ Choose correct env var depending on build tool
  //   const SOCKET_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
  //   console.log("SOCKET: URL :", SOCKET_URL);

  //   const newSocket = io(SOCKET_URL, {
  //     withCredentials: true,
  //     // transports: ["websocket"],
  //     // reconnection: true,
  //     // reconnectionAttempts: 5,
  //   });

  //   newSocket.on("connect", () => {
  //     console.log("✅ Connected to socket:", newSocket.id);
  //     newSocket.emit("join", currentUserId);
  //   });

  //   newSocket.on("disconnect", (reason) => {
  //     console.warn("⚠️ Socket disconnected:", reason);
  //   });

  //   newSocket.on("connect_error", (err) => {
  //     console.error("❌ Socket connection error:", err.message);
  //   });

  //   setSocket(newSocket);

  //   return () => {
  //     console.log("🧹 Cleaning up socket connection...");
  //     newSocket.disconnect();
  //     setSocket(null);
  //   };
  // }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;

    const SOCKET_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
    console.log("SOCKET: URL :", SOCKET_URL);

    // Get token from cookies for authentication
    const token = Cookies.get('accessToken');
    console.log("🔑 Token for socket:", token ? "Found" : "Not found");

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      auth: {
        token: token  // Send token via auth
      },
      query: {
        token: token  // Also send via query as fallback
      },
      extraHeaders: {
        Authorization: `Bearer ${token}`  // Also send via headers
      },
      transports: ["websocket", "polling"], // Allow both for better compatibility
      reconnection: true,
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket:", newSocket.id);
      // Don't emit join here, the backend handles user joining on connection
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      console.log("🧹 Cleaning up socket connection...");
      newSocket.disconnect();
      setSocket(null);
    };
  }, [currentUserId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
