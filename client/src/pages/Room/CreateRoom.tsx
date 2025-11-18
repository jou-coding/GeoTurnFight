import { useContext, useState } from "react"
import Button from "../../components/Button"
import { RoomCotext } from "../../components/Provider"
import type {Room}  from "../../components/Provider";
import {io} from "socket.io-client"
import { Link } from "react-router-dom";



const CreateRoom = () => {

    
    const roomContext:Room | null = useContext(RoomCotext)
    if(roomContext == null){
        return <div>エラーだよ</div>
    }


    const [name_value,setNameValue] = useState<string | null>(null)

    const handleChange = (e:any) => {
        setNameValue(e.target.value)
    }

    const sendRoomName = async () => {
        
        const socket = io("http://localhost:3000")

        // 接続成功時の処理
        socket.on("connect",() => {
            socket.emit("joinname",(socketID:string) => {
                console.log(socketID)
            })
        })

        // 接続失敗時のエラーハンドリング
        socket.on("connect_error",(error:unknown) => {
            console.error("失敗",error)
        })
       

        const res = await fetch("http://localhost:3000/api/room/createRoom",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:name_value})
        })

        if(name_value == null){
            return <div>値が入っていない</div>
        }

        //　名前の記録
        ChangeName(name_value)
         


        return res
    }

 return(
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4  py-8">
        <div className="w-full max-w-md transform -translate-y-6  sm:-translate-y-8 bg-blue-500">
            <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-center mb-6">部屋のID入力</h2>
                <form className="space-y-4">
                    <input type="text" value={name_value} onChange={handleChange}  placeholder="部屋のID入力" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"/>
                    
                     <Link to="/battle"><button type="button" 
                        onClick={() => sendRoomName()}
                        className="w-full  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">決定</button></Link>
                </form>
            </div>
            
        </div>
    </div>
 )
}

export default CreateRoom