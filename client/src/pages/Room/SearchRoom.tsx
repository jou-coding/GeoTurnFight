import Button from "../../components/Button"
import { useState } from "react"

const SearchRoom = () => {
    const [room_name,setRoomName] = useState("")

    const  changeRoomName = (e:any) => {
        setRoomName(e.target.value)
    }

    const SearchRoom = async () => {
        const res = await fetch("http://localhost:3000/api/room/findRoom",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:room_name})
    }
)
   

        return res
    }

    

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4  py-8">
            <div className="w-full max-w-md transform -translate-y-6  sm:-translate-y-8 bg-blue-500">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">入る部屋のID入力</h2>
                    <form className="space-y-4">
                        <input type="text" value={room_name} onChange={changeRoomName} placeholder="部屋のID入力" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"/>
                        <Button name="/battle" buttonName="決定" func={SearchRoom} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchRoom
