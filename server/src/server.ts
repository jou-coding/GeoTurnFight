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

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
