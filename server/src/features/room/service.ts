import type { DefaultEventsMap, Server, Socket } from "socket.io";

export async function registerRoomHandler(socket:Socket,io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
     socket.on("joinRoom",async (roomName:string) =>{
       try{
        // ルーム作成
        socket.join(roomName)
        console.log(`${socket.id}が${roomName}に参加`)
         // ルーム内の人数を取得
        const sockets = await io.in(roomName).fetchSockets();
        const userCount = sockets.length;
        console.log(`${roomName} の人数: ${userCount}人`);
        // ルーム名を記述したい
        console.log("ルームに入れたよ")
       }catch(error){
        console.error("エラーが発生しています",error)
       }
    })
    
}