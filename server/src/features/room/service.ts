import type { DefaultEventsMap, Server, Socket } from "socket.io";

const roomUsers:Record<string,string[]> = {}

export  function registerRoomHandler(socket:Socket,io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

    //クライアントからの参加要求
     socket.on("joinRoom",({roomName,userName}) =>{
       try{
        if (!roomName || !userName) return;

        socket.join(roomName)

        //　ユーザー一覧を更新
        const users = roomUsers[roomName] ?? []
        if(!users.includes(userName)){
            roomUsers[roomName] = [...users,userName]
        }

        // その部屋にいる全員へ最新メンバーを配信
        io.to(roomName).emit("roomUsers",roomUsers[roomName])

       }catch(error){
        console.error("エラーが発生しています",error)
       }
    })
    
}