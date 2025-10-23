import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const LoginUser:React.FC = () => {
    const navigate = useNavigate()

         const [name_value,nameSetValue] = useState("") //　nameの状態
         const [password_value,passwordSetValue] = useState("") // passwordの状態

        // 値の更新
        const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            nameSetValue(e.target.value) 
        }

        // パスワードの更新
        const passwordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            passwordSetValue(e.target.value)
        }
 
    const handleLogin =async() => {
        const res = await fetch("http://localhost:3000/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username:name_value,password:password_value})
        }) 

        console.log(res)
        
        if(res.ok === true){
            navigate("/room")
        }else{
            alert("ログイン失敗")
        }

    }
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md transform translate-y-6 sm:translate-y-8 bg-blue-500">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>
                    <form className="space-y-4">
                        <input type="name" value={name_value} onChange={nameChange} placeholder="メールアドレス" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"  />
                        <input type="password" value={password_value} onChange={passwordChange} placeholder="パスワード" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <button type="button" 
                        onClick={() => handleLogin()}
                        className="w-full  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">送信</button>
                    </form>
                    <p className="text-center test-sm text-gray-500 mt-4">アカウントがありませんか？
                        <Link to="/resisteruser" className="text-blue-500 hover:underline">新規登録</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default LoginUser