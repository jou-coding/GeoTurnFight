import React, { useState } from "react";
import { SearchRoomModal } from "../../components/modal/SearchRoomModal";
import CreateRoomModal from "../../components/modal/CreateRoomModal";

const Room:React.FC = () => {

    const [searchModal,setSearchModal] =  useState(false)
    const [createModal,setCreateModal] =  useState(false)

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md transform translate-y-12 sm:translate-y-24 flex gap-5 items-center jusify-center flex flex-col gap-5">
                <button className=" px-12 py-6 bg-blue-300 rounded-lg hover:bg-blue-400" onClick={() => setSearchModal(true)}>部屋に参加</button>
                <button className=" px-12 py-6 bg-blue-300 rounded-lg hover:bg-blue-400" onClick={() => setCreateModal(true)}>部屋を作る</button>
            </div>
            {searchModal && (<SearchRoomModal onClose={() => setSearchModal(false)}/>)}
            {createModal && (<CreateRoomModal onClose={() => setCreateModal(false)}/>)}
        </div>
    )

}

export default Room