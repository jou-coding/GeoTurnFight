import Express from "express";
import http from "http"
import dotenv from "dotenv";
import cors from "cors"
import { authRouter } from "./features/auth/routes.js";
import { roomRouter } from "./features/room/routes.js";
import { initSocketServer } from "./socket/server.js";



dotenv.config()
// Expressアプリの作成
const app = Express();
//1段分のプロキシを信頼する
app.set("trust proxy", 1);
// HTTPサーバーを作成し、Expressを使う
const server = http.createServer(app)
// 静的ファイル（HTML/CSS/JSなど)を配信
app.use(Express.static("public"))

app.use(cors({
  origin: [`${process.env.CORS_ORIGIN}`],
  credentials: true
}));


//Jsonリクエストをパースする
app.use(Express.json())

// ルーターをマウントする
app.use("/api/auth",authRouter)
app.use("/api/room",roomRouter)

export const io = initSocketServer(server)

app.set("io",io)

const HOST:string = process.env.HOST || "127.0.0.1"
const PORT:number = Number(process.env.PORT) || 3000;

server.listen({port:PORT,host:HOST},() => {
   console.log(`Server running on port ${PORT}:${HOST}`);
});

