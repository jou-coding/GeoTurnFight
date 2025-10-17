import React from "react"

const FirstScreen:React.FC =() => {
    return(
        // 全画面レイアウト
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md transform translate-y-6 sm:translate-y-8 flex gap-5 items-center justify-center">
                <div className=" px-6 py-2 bg-blue-300 rounded-lg hover:bg-blue-400 transitoin duration-300 text-center">新規</div>
                <div className="px-6 py-2 bg-blue-300 rounded-lg  hover:bg-blue-400 transition duration-300 text-center">ログイン</div>
            </div>
        </div>
        
    )
}

export default FirstScreen