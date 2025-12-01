import { useEffect, useState } from "react"

import Card from "../components/Card"
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  name: string;
  buttonName: string;
  user01?: string;
  user02?: string;
};


const Match = () => {

    const [card,setCard] = useState(false)
    
    //userw2
    const [user2,setUser2] = useState("")
        
    //URLクエリをゲットする
         const location = useLocation();
        const params = new URLSearchParams(location.search);
        const roomName = params.get("roomName"); 

    useEffect(()=>{
        fetch("http://localhost:3001/users").then((res)=>res.json()).then((data)=> {
            setUser2(data[1].name)
            
        })
    },[])

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

     let name = localStorage.getItem("username")
    if(typeof(name) !== "string"){
    name = "名無し"
    }

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