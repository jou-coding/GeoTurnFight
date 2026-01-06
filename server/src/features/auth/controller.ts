import type {Request,Response} from "express"
import {createUser,validateUser} from "./service.js"

export async function register(req:Request,res:Response) {
    try{
      const {username ,password}  = req.body
    
       // バリデーション
        if (!username || !password) {
          return res.status(400).json({ 
            status: false, 
            error: "ユーザー名とパスワードは必須です" 
          });
        }


    
    await createUser(username,password)
    
      res.send({status:true})
      } catch(error){
        console.error("Registration error:", error);
    
         res.status(500).json({ 
          status: false, 
          error: "サーバーエラーが発生しました" 
        });
      }
}


export async function login(req:Request,res:Response) {
     try{
     const {username,password} = req.body
     // userネーム送られている
     console.log("ユーザーネーム",username)
      const user =  await validateUser(username,password)
      console.log("userについて教えて",user)
    
      if(!user){
        return res.status(401).json({error:"認証が失敗しました。"})
      } 
     res.send({status:true})
      }catch(error){
        console.error("コンソールエラー",error)
      } 
}