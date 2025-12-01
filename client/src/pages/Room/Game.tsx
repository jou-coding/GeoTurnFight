import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useSocket } from "../AppProvider"



interface  country {
    name:string
}

const correctCountryName = ["二ホン","カンコク","アメリカ"]

const  Game:React.FC = () => {

    const [country,setCountry] = useState("")
    const [countryName,setCountryName] = useState<country[]  >([])
    const [turn,setTurn] = useState(true)
    
    const socket = useSocket()    

    // socket.ioの連携
   useEffect(() => {

    const handleConnect = () => {
        console.log("socket connected")
        socket.emit("joinRoom", user01)
    }

    const handleError = (err: any) => {
        console.log("接続エラー", err)
    }

    const handleDisconnect = (reason: any) => {
        console.log("切断", reason)
    }

    socket.on("connect", handleConnect)
    socket.on("connect_error", handleError)
    socket.on("disconnect", handleDisconnect)

    // クリーンアップ関数（イベントだけ解除）
    return () => {
        socket.off("connect", handleConnect)
        socket.off("connect_error", handleError)
        socket.off("disconnect", handleDisconnect)
        console.log("cleanup: socket イベント解除")
    }

}, [])

    // ユーザー情報
      const location = useLocation();
    const { user01, user02 } = (location.state || {}) as {
    user01?: string;
    user02?: string;
  };


    //国名のチェック関数
    const checkCountry = () => {
        correctCountryName.forEach((value)=>{
            //　回答データ確認
            const num = value == country

            // 同じ回答か確認
            let check_same_answer:boolean
           check_same_answer =  countryName.some((value) => {
                 return value.name == country
            })

            if(num && !check_same_answer ){
                setCountryName([...countryName,{name:value}])
                setTurn(!turn)
                setCountry("")
            }
        })        
    }

    
    const rireki = () => {
            return(
            <>
                {countryName.map((value, id) => {
                    return  <div key={id} className="text-center">{value.name}</div>
            })}
                
            </>
            )
            
        }

        const turnFunction = () => {
            return(
                <>
                {turn?<div  className="text-center">{user01}のターン</div>:<div className="text-center">{user02}のターン</div>}
                </>
            )
        }

    

    return(
        <div className="min-h-screen bg-gray-50 flex justify-center item-center flex-col">
            {turnFunction()}
            <div className=" flex items-center justify-center">
                
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-4">
                    <h2 className="text-2xl font-bold text-center">国名入力</h2>
                    <input type="text"  placeholder="国名を入力" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                     value={country}
        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button className="p-3 bg-gray-500 rounded-lg hover:bg-gray-700" onClick={checkCountry}>決定</button>
                    
                    <div className="border">
                        <h2 className="font-bold text-center">履歴</h2>
                        {rireki()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game