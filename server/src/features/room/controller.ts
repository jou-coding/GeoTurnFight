import type {Request,Response} from "express"
import { saveRoome,findFirst,findMany } from "./repository.js"


export async function allRooms(req:Request,res:Response) {
    try{
        const allRoom  = await findMany()
        res.send({allroom:allRoom})
    }catch(error){
    console.error("Registration error:", error);
    res.status(500).json({ 
          status: false, 
          error: "サーバーエラーが発生しました" 
        });
    }
}

export async function findRoom(req:Request,res:Response) {
    try{
         const {name} = req.body
          const room = await findFirst(name)
         res.send({room:room?.name})
    }catch(error){
        res.send({status:false})
    }
}


export async function createRoom(req:Request,res:Response) {
    try{

        const {name} = req.body
         await saveRoome(name)
         res.send({status:true})

    }catch(error){
           console.error("Registration error:", error);
    res.status(500).json({ 
          status: false, 
          error: "サーバーエラーが発生しました" 
        });
    }
    
}