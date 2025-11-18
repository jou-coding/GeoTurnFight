// SocketProvider.tsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

// Context作成
const SocketContext = createContext<Socket | null>(null);

// useContext用のフック
export const useSocket = () => useContext(SocketContext);

// Provider本体
export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // サーバーに接続
    const socket = io("http://localhost:3000", { autoConnect: true });
    socketRef.current = socket;

    console.log("✅ Socket connected");

    // クリーンアップ
    return () => {
      socket.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, []);

  // useRefだと初回はnullなので、ここで強制的に値を渡す
  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
