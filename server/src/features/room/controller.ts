import type {Request,Response} from "express"
import jwt from "jsonwebtoken"
import { saveRoome,findFirst,findMany,roomIdFunc } from "./repository.js"


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

        const authHeader = req.headers.authorization
        const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null
         if (!token) {
            return res.status(401).json({ error: "トークンがありません。" })
        }
        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            return res.status(500).json({ error: "JWT_SECRETが設定されていません。" })
        }
        const payload = jwt.verify(token, jwtSecret) 
        console.log("payoladについて？",payload)

         const {name} = req.body
          const room = await findFirst(name)
         res.send({room:room?.name})
    }catch(error){
        res.send({status:false})
    }
}


export async function createRoom(req:Request,res:Response) {
    try{

        const authHeader = req.headers.authorization
        const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null
        if (!token) {
            return res.status(401).json({ error: "トークンがありません。" })
        }

        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            return res.status(500).json({ error: "JWT_SECRETが設定されていません。" })
        }
        const payload = jwt.verify(token, jwtSecret) 
        console.log("payoladについて？",payload)


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

// roomのIDを送る
export async function getRoomId(req:Request,res:Response) {
    try{
            const name = req.query.name as string; 
        const roomid  =  await roomIdFunc(name)
        res.send({id:roomid})
        
    }catch(error){
         console.error("Registration error:", error);
        res.status(500).json({ 
          status: false, 
          error: "サーバーエラーが発生しました" 
        });
    }
    
}