import { useState } from "react"
import Button from "./Button"



export const SearchRoomModal:React.FC = () => {
    const [roomName,setRoomName] = useState("")

    const  changeRoomName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value)
    }

    const SearchRoom = async () => {
        const res = await fetch("http://localhost:3000/api/room/findRoom",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:roomName})
    }
)
        return res
    }

    

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 ">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">入る部屋のID入力</h2>
                    <form className="space-y-4">
                        <input type="text" value={roomName} onChange={changeRoomName} placeholder="部屋のID入力" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"/>
                        <Button name={`/Match?roomName=${roomName}`} buttonName="決定" func={SearchRoom} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchRoomModal
