import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"

const hoge = {
    title:"hoge"
}

const hoi = {
    title:"hoge"
}

const Battle = () => {

    const [card,setCard] = useState(false)

    useEffect(()=>{
         let btn = document.getElementById("btn")
    btn?.addEventListener("click",() => {
        setCard(true)
    })

    },[])

   
    

    return(
        <div className="min-h-screen bg-gray-50 flex justify-center  items-center flex-col">
            <div className="w-full max-w-md space-y-4">
                <Card title={hoge.title}/>
                <Card title={hoi.title} />
            </div>
            {card ?<Button name="/sendcountry" buttonName="決定"/> :<div id="btn" className="bg-white rounded-lg  p-3 hover:shadow-lg">準備OK</div>}
            
        </div>

    )
}

export default Battle