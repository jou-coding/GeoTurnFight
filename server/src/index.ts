import Express from "express";
import http from "http"
import bcrypt from "bcrypt"
import { PrismaClient } from '../generated/prisma/client.js'

// プリズマクライアントの作成
const prisma = new PrismaClient()

// Expressアプリの作成
const app = Express();
// HTTPサーバーを作成し、Expressを使う
const server = http.createServer(app)
// 静的ファイル（HTML/CSS/JSなど)を配信
app.use(Express.static("public"))

//Jsonリクエストをパースしていない
app.use(Express.json())


// 新規登録　POST /api/auth/register - 新規登録
app.post("/api/auth/register",async (req,res) =>{
  try{
  const {username ,password}  = req.body

   // バリデーション
    if (!username || !password) {
      return res.status(400).json({ 
        status: false, 
        error: "ユーザー名とパスワードは必須です" 
      });
    }
  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

   await prisma.user.create({
    data: {
      name: username,
      password: hashedPassword,
    },
  });

  res.send({status:true})
  } catch(error){
    console.error("Registration error:", error);

     res.status(500).json({ 
      status: false, 
      error: "サーバーエラーが発生しました" 
    });
  }
})

// POST /api/auth/login　ログイン

app.post("/api/auth/login",async (req,res) => {
  try{
 const {username,password} = req.body
 // データベースからユーザーを取得
  const user = await prisma.user.findUnique({where:{
    name:username
  }})

  if(!user){
    return res.status(401).json({error:"ユーザーが見つかりません"})
  }

  // パスワードを比較
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(401).send({error:"パスワードが正しくありません"})
  }

  res.send({message:"ログイン成功",userId:user.id})
  }catch(error){
    console.error("コンソールエラー",error)
  } 
})


server.listen(3000, () => {
  console.log("http://localhost:3000");
});
