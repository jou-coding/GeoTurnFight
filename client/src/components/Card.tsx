const Card = () => {
    return(
        <div className= "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex " >
             <div className="w-5/12 flex justify-center">
                <img src="..." className="rounded-full bg-blue-400 w-48 h-48 object-cover" />
             </div>
             <div className="w-7/12 pl-6 flex  items-center justify-start">
                <h3 className="text-xl font-bold mb-2">タイトル</h3>
             </div>
        </div>
    )
}

export default Card