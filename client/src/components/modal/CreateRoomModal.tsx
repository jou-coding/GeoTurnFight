import { useContext, useState } from "react"
import { RoomCotext, type Room } from "../Provider"
import { socket } from "../../App"
import { Link } from "react-router-dom"

type Props = {
    onClose:() =>  void
}

export const CreateRoomModal:React.FC<Props> = ({onClose}) => {
       const roomContext:Room | null = useContext(RoomCotext)
        if(roomContext == null){
            return <div>エラーだよ</div>
        }
    
    
        const [nameValue,setNameValue] = useState<string>("")
    
        const handleChange = (e:any) => {
            setNameValue(e.target.value)
        }
    
        const sendRoomName = async () => {
            
    
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
                body:JSON.stringify({name:nameValue})
            })
    
            return res
        }

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 ">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">部屋のID入力</h2>
                    <form className="space-y-4">
                        <input type="text" value={nameValue} onChange={handleChange} placeholder="部屋のID入力" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"/>
                        <div className="flex gap-3">
                            <Link to={`/Match?roomName=${nameValue}`}><button className=" p-2 bg-blue-500 hover:bg-blue-700 shadow-lg rounded-lg" onClick={sendRoomName} >決定</button></Link>
                        <button className=" p-2 bg-blue-500 hover:bg-blue-700 shadow-lg rounded-lg" onClick={onClose}>戻る</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateRoomModal
