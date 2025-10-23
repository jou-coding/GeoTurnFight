import React, { useState } from "react"
import Button from "../../components/Button"

const ResisterUser:React.FC = () => {
    const [name_value,setNameValue] = useState("")
    const [password_value,setPasswordValue] = useState("")

    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value)
    }

    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const RegisterUser = async() => {
        const res = await fetch("http://localhost:3000/api/auth/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username:name_value,password:password_value})
        })
        return res
    }


    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md transform translate-y-6 sm:translate-y-8 bg-blue-500">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">新規登録</h2>
                    <form className="space-y-4">
                        <input type="name" value={name_value} onChange={nameChange} placeholder="名前" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="password"  value={password_value} onChange={passwordChange} placeholder="パスワード" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                       <Button name="/room" buttonName="登録" func={RegisterUser}/>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ResisterUser