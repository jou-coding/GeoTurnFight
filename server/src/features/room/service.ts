import type { DefaultEventsMap, Server, Socket } from "socket.io";

const roomUsers:Record<string,string[]> = {}

export  function registerRoomHandler(socket:Socket,io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

    //クライアントからの参加要求
     socket.on("joinRoom",(data) =>{
       // エラーの回避（後で修正）
        if(data==null) return

        const {roomName,userName} = data 

        if (!roomName || !userName) return;

        

        socket.join(roomName)

        //　ユーザー一覧を更新
        const users = roomUsers[roomName] ?? []
        if(!users.includes(userName)){
            roomUsers[roomName] = [...users,userName]
        }

        // その部屋にいる全員へ最新メンバーを配信
        io.to(roomName).emit("roomUsers",roomUsers[roomName])

       
    })
    
}