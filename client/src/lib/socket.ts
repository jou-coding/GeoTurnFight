import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: true,
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("🔥 socket.io connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("💤 socket.io disconnected:", reason);
});
