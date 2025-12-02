import { useEffect, useState } from "react"


import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { socket } from "../../lib/socket";

type Props = {
  name: string;
  buttonName: string;
  user01?: string;
  user02?: string;
};


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
       console.log(name)
       
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

    // ボタンコンポーネント
    const Button = ({ name, buttonName, user01, user02 }: Props) => {
    const navigate = useNavigate();

    const handleClick = async () => {

        
        
        const response = await fetch(`http://localhost:3000/api/room/getRoomId?name=${roomName}`)

        const data = await response.json();
        navigate(`${name}?roomId=${data.id}`, {
        state: {
            user01,
            user02,
        },
        });
    };

    return (
        <button
        onClick={handleClick}
        className="px-4 py-2 rounded-md bg-blue-500 text-white"
        >
        {buttonName}
        </button>
        );
    };

    

    return(
        <div className="min-h-screen bg-gray-50 flex justify-center  items-center flex-col">
            <div className="w-full max-w-md space-y-4">
                <Card title={name}/>
                <Card title={user2} />
            </div>
            {card ?
  <Button
    name="/Game"
    buttonName="決定"
    user01={name}
    user02={user2}
  />:(<div id="btn" onClick={() => setCard(true)} className="bg-white rounded-lg  p-3 hover:shadow-lg">準備OK</div>)}
        </div>
    )
}

export default Match