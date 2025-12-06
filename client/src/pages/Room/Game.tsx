import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSocket } from "../AppProvider"


const  Game:React.FC = () => {

    const [country,setCountry] = useState("")

    const [countries,setCountries] = useState<string[]>([])
    
    const [turn,setTurn] = useState(true)

    // 敗北管理
    const [haiboku,setHaiboku] = useState(false)
    
    const socket = useSocket()

    // 勝敗


    // socket.ioの連携
   useEffect(() => {

    const handleConnect = () => {
        console.log("socket connected")
    }

    const handleError = (err: any) => {
        console.log("接続エラー", err)
    }

    const handleDisconnect = (reason: any) => {
        console.log("切断", reason)
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
    socket.on("turn",changeTurn)
    socket.on("rireki",rirekifunc)

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
        // ソケットを送る
        socket.emit("checkCountry",{country:country})
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

        const haibokuFunction = () => {
            return(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-md flex justify-center bg-blue-300 p-50 rounded-lg">
                    <div className="w-full max-w-sm space-y-5 m-3">
                        <div className="border-b text-center  pb-3  ">結果</div>
                        <div className="font-bold text-center text-lg">敗北</div>
                        <div className="flex flex-row gap-2 justify-center">
                            <Link to="/room" className="bg-blue-500 p-10 rounded-lg">終了</Link>
                            <button className="bg-blue-500 p-10 rounded-lg" name="/Match">もう一度</button>
                        </div>
                    </div>
                </div>
            </div>
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
            {haiboku && haibokuFunction()}
        </div>
    )
}

export default Game