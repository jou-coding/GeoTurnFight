import React from "react";
import { Link } from "react-router-dom";

const Room:React.FC = () => {
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            
            <div className="w-full max-w-md transform translate-y-12 sm:translate-y-24 flex gap-5 items-center jusify-center flex flex-col gap-5">
                <Link to="/createroom" className=" px-12 py-6 bg-blue-300 rounded-lg hover:bg-blue-400">部屋を作成</Link>
                <Link to="/searchroom" className="px-12 py-6 bg-blue-300 hover:bg-blue-400 rounded-lg transition duration-300 ">部屋に参加</Link>
            </div>
        </div>
    )

}

export default Room