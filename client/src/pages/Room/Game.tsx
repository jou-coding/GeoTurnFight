import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSocket } from "../AppProvider"
import HaibokuButton from "../../components/button/HaibokuButton"



const  Game:React.FC = () => {
    type PlayerId = "player1"|"player2"|undefined

        // ユーザー情報
    const location = useLocation();
    const { user01, user02 } = (location.state || {}) as {
        user01: string;
        user02: string;
  };
  const myName = localStorage.getItem("username")
  let initialPlayer:PlayerId | null = null;
  if(myName === user01) initialPlayer = "player1"
  if(myName === user02) initialPlayer = "player2"

    const [country,setCountry] = useState("")

    const [countries,setCountries] = useState<string[]>([])
    
    // ターン trunの時、user01
    const [turn,setTurn] = useState(true)

    // フロント側で判定する
    const [myPlayer,setMyPlayer] = useState<PlayerId | null>(initialPlayer)

    // 敗北管理
    const [haiboku,setHaiboku] = useState(false)
    
    const socket = useSocket()
    
    // socket.ioの連携
   useEffect(() => {

     socket.on("turnUpdate", (turn: PlayerId) => {
          console.log(turn)   });

    const handleConnect = () => {
        console.log("socket connected")
    }

    const handleError = (err: any) => {
        console.log("接続エラー", err)
    }

    const handleDisconnect = (reason: any) => {
        console.log("切断", reason)
    }

      const errorMessage = (err: any) => {
        console.log("エラーメッセージ", err)
        alert(err)
    }

    const changeTurn = (value:boolean) => {
        setTurn(value)
    }

    const rirekifunc = (data:{data:string[]})=>{
        const countries = data.data
        setCountries(countries)
    }

    socket.on("connect", handleConnect)
    socket.on("connect_error", handleError)
    socket.on("disconnect", handleDisconnect)
    socket.on("errorMessage",errorMessage)
    socket.on("turn",changeTurn)
    socket.on("rireki",rirekifunc)

    // クリーンアップ関数（イベントだけ解除）
    return () => {
        socket.off("connect", handleConnect)
        socket.off("connect_error", handleError)
        socket.off("disconnect", handleDisconnect)
        socket.off("turnUpdate");
        console.log("cleanup: socket イベント解除")
    }

}, [])



 
    //国名のチェック関数
    const checkCountry = () => {
        // ソケットを送る
        
        console.log("kuni",country)
        console.log("player",myPlayer)
        socket.emit("checkCountry",{player:myPlayer,country:country})
        setCountry("")
    }

    
    const rireki = () => {
            return(
            <>
                {countries.map((value, id) => {
                    return  <div key={id} className="text-center">{value}</div>
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
                    <button className="p-3 bg-blue-300 rounded-lg" onClick={() => setHaiboku(true)}>降参</button>
                    <div className="border">
                        <h2 className="font-bold text-center">履歴</h2>
                        {rireki()}
                    </div>
                </div>
            </div>
            {haiboku && <HaibokuButton user01={user01} user02={user02} turn={turn} />}
        </div>
    )
}

export default Game