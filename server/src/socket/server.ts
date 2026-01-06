import * as http from "http";
import { Server } from "socket.io"
import { registerRoomHandler } from "../features/room/game/roomHandler.js";
import { registerGameHandler } from "../features/room/game/gameHandler.js";

export function initSocketServer(server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true
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

