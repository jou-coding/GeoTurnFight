import * as http from "http";
import { Server } from "socket.io"
import { registerRoomHandler } from "../features/room/game/roomHandler.js";
import { registerGameHandler } from "../features/room/game/gameHandler.js";
import { verifyAuthToken } from "../features/auth/token.js";

export function initSocketServer(server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use((socket, next) => {
  const authToken =
    socket.handshake.auth?.token ??
    socket.handshake.headers.authorization?.toString().replace("Bearer ", "");

  if (!authToken) {
    return next(new Error("認証トークンが必要です。"));
  }

  try {
    const payload = verifyAuthToken(authToken);
    socket.data.user = payload;
    return next();
  } catch (error) {
    console.error("Socket auth failed:", error);
    return next(new Error("認証に失敗しました。"));
  }
});

io.on("connection",(socket) =>{
    console.log("ClientのsocketIdは",socket.id)
    // ここに、onやemitの処理を書く
 
    // 各機能のハンドラーを登録する。
    registerRoomHandler(socket, io);
    registerGameHandler(socket, io);

    socket.on("disconnect",() => {
        console.log("disconnectIdは、",socket.id)
    })
})

return io
}

