import type { DefaultEventsMap, Server, Socket } from "socket.io";

const roomUsers:Record<string,string[]> = {}

export  function registerRoomHandler(socket:Socket,io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

    //クライアントからの参加要求
     socket.on("joinRoom",({roomName,userName}) =>{
       try{
        console.log("RoomName:",roomName,"usernama:",userName)
        if (!roomName || !userName) return;
        

        socket.join(roomName)
        console.log(`${socket.id},${userName}が${roomName}に参加`)

        //　ユーザー一覧を更新
        const users = roomUsers[roomName] ?? []
        console.log("ユーザーは何人いるか",users)
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