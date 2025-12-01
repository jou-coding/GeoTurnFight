import React, { createContext, useContext } from "react";
import { socket } from "./lib/socket";
import type { Socket } from "socket.io-client";


const SocketContext = createContext<Socket | null>(socket);
export const useSocket = () => useContext(SocketContext)!;

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
