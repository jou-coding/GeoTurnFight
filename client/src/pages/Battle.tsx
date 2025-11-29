import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"



const Battle = () => {

    const [card,setCard] = useState(false)
    //user1
    const [user1,setUser1] = useState()
    //userw2
    const [user2,setUser2] = useState()

    useEffect(()=>{
         let btn = document.getElementById("btn")
    btn?.addEventListener("click",() => {
        setCard(true)
    })

    },[])

    useEffect(()=>{
        fetch("http://localhost:3001/users").then((res)=>res.json()).then((data)=> {
            setUser1(data[0].name)
            setUser2(data[1].name)
        })
    })
    

    return(
        <div className="min-h-screen bg-gray-50 flex justify-center  items-center flex-col">
            <div className="w-full max-w-md space-y-4">
                <Card title={user1}/>
                <Card title={user2} />
            </div>
            {card ?<Button name="/sendcountry" buttonName="決定"/> :<div id="btn" className="bg-white rounded-lg  p-3 hover:shadow-lg">準備OK</div>}
            
        </div>

    )
}

export default Battle