import * as http from "http";
import { Server } from "socket.io"

export function initSocketServer(server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){

const io = new Server(server)

io.on("connection",(socket) =>{
    console.log("ClientのsocketIdは",socket.id)

    // 各機能のハンドラーを登録する。


    socket.on("disconnect",() => {
        console.log("disconnectIdは、",socket.id)
    })
})

return io
}

