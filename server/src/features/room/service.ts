import type { DefaultEventsMap, Server, Socket } from "socket.io";

const roomUsers:Record<string,string[]> = {}

// 国名の正解データ
const correctCountryName = ["二ホン","カンコク","アメリカ"]
// 言われた国名リスト
const countries:string[] = []
// ターン
let turn:boolean = true

// boolean
const changeTrun = () =>{
    if(turn === true){
        turn = false
    }else if(turn === false){
        turn = true
    }
}

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

    // 国名のチェック関数
    socket.on("checkCountry",(data) => {
            console.log("送ったデータ:",data)
             // データの取り出し
        let country = data.country
         correctCountryName.forEach((value)=>{
            //　回答データ確認
            const num = value == country
            // 同じ回答か確認
            let check_same_answer:boolean
           check_same_answer =  countries.some((value) => {
                 return value== country
            })
            if(num && !check_same_answer ){
                countries.push(country)
                changeTrun()
                socket.emit("turn",turn)
                socket.emit("rireki",{data:countries})
                country = ""
                console.log(countries)
            }
        })   
    })
    
}