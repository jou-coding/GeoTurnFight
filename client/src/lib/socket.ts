import { io } from "socket.io-client";
import { API_BASE_URL } from "../config/api";

export const socket = io(`${API_BASE_URL}`, {
  autoConnect: true,
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("🔥 socket.io connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("💤 socket.io disconnected:", reason);
});
