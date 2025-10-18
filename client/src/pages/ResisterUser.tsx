import React from "react"
import { useNavigate } from "react-router-dom"

const ResisterUser:React.FC = () => {
    const navigate = useNavigate()

    const hanndleClick = () => {
        navigate("/Room")
    }


    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md transform translate-y-6 sm:translate-y-8 bg-blue-500">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">新規登録</h2>
                    <form className="space-y-4">
                        <input type="email" placeholder="メールアドレス" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="password" placeholder="パスワード" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <button type="button" 
                        onClick={hanndleClick}
                        className="w-full  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">登録</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ResisterUser