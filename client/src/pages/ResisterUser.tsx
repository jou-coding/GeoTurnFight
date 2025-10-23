import React from "react"
import Button from "../components/Button"

const ResisterUser:React.FC = () => {

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md transform translate-y-6 sm:translate-y-8 bg-blue-500">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">新規登録</h2>
                    <form className="space-y-4">
                        <input type="name" placeholder="メールアドレス" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                        <input type="password" placeholder="パスワード" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                       <Button name="/room" buttonName="登録"/>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ResisterUser