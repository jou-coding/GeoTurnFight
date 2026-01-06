import { io } from "socket.io-client";
import { getAuthToken } from "./auth";

export const socket = io("http://localhost:3000", {
  autoConnect: true,
  transports: ["websocket", "polling"],
  auth: {
    token: getAuthToken(),
  },
});

export function updateSocketAuth(token: string | null) {
  socket.auth = {
    token: token ?? undefined,
  };

  if (socket.connected) {
    socket.disconnect();
  }
  socket.connect();
}

socket.on("connect", () => {
  console.log("🔥 socket.io connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("💤 socket.io disconnected:", reason);
});
