import { useEffect, useState } from "react"

import Card from "../components/Card"
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  buttonName: string;
  user01?: string;
  user02?: string;
};


const Battle = () => {

    const [card,setCard] = useState(false)
    //user1
    const [user1,setUser1] = useState("")
    //userw2
    const [user2,setUser2] = useState("")


    useEffect(()=>{
        fetch("http://localhost:3001/users").then((res)=>res.json()).then((data)=> {
            setUser1(data[0].name)
            setUser2(data[1].name)
            
        })
    },[])

    // ボタンコンポーネント
    const Button = ({ name, buttonName, user01, user02 }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(name, {
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
                <Card title={user1}/>
                <Card title={user2} />
            </div>
            {card ?
  <Button
    name="/SendCountry"
    buttonName="決定"
    user01={user1}
    user02={user2}
  />:(<div id="btn" onClick={() => setCard(true)} className="bg-white rounded-lg  p-3 hover:shadow-lg">準備OK</div>)}
        </div>
    )
}

export default Battle