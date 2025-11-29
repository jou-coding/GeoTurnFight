import * as http from "http";
import { Server } from "socket.io"
import { registerRoomHandler } from "../features/room/service.js";

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
    socket.on("hello",(data) => {
        console.log(data.name)
    })

    // 各機能のハンドラーを登録する。
    registerRoomHandler(socket,io)

    socket.on("disconnect",() => {
        console.log("disconnectIdは、",socket.id)
    })
})

return io
}

