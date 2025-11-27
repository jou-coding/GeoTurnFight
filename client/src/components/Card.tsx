import React from "react"

type CardProps = {
    title?:string
}

const Card:React.FC<CardProps> = ({title}) => {
    return(
        <div className= "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex mb-4" >
             <div className="w-5/12 flex justify-center">
                <img src="..." className="rounded-full bg-blue-400 w-48 h-48 object-cover" />
             </div>
             <div className="w-7/12 pl-6 flex  items-center justify-start ">
                {title ? (<h3 className="text-xl font-bold mb-2">{title}</h3>):(<h3 className="text-xl font-bold mb-2">タイトル</h3>)  }
             </div>
        </div>
    )
}

export default Card