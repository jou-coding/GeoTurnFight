import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import { socket } from "../../lib/socket";
import RoomButton from "../../components/room/RoomButton";

const Match = () => {

    const [card,setCard] = useState(false)
    const [user2,setUser2] = useState("")
 
    //URLクエリから、roomNameを取得
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const roomName = params.get("roomName") ?? ""; 

    let name = localStorage.getItem("username")
    if(typeof(name) !== "string"){
    name = "名無し"
    }

    useEffect(()=>{
       if(!roomName) return;
       
       // 1. この部屋に参加する
       socket.emit("joinRoom",{
        roomName,
        userName:name
       })

       // 2. 部屋メンバー一覧が送られてきた処理
       const handleRoomUsers = (users:string[]) => {
            // 自分以外のユーザーをuser2にセット
            const other = users.find((u) => u !== name)
            if(other){
                setUser2(other)
            }
       }

        socket.on("roomUsers", handleRoomUsers);
        
        // 3. クリーンアップ（このページから離れたら抜ける）
        return() => {
            socket.off("roomUsers",handleRoomUsers)
        }
    },[roomName,name])

    return(
        <div className="min-h-screen bg-gray-50 flex justify-center  items-center flex-col">
            <div className="w-full max-w-md space-y-4">
                <Card title={name}/>
                <Card title={user2} />
            </div>
            {card ?
  <RoomButton
    name="/CountryBattleGame"
    buttonName="決定"
    user01={name}
    user02={user2}
    roomName={roomName}
  />:(<div id="btn" onClick={() => setCard(true)} className="bg-white rounded-lg  p-3 hover:shadow-lg">準備OK</div>)}
        </div>
    )
}

export default Match