import Express from "express";
import http from "http"
import dotenv from "dotenv";
import cors from "cors"
import { authRouter } from "./features/auth/routes.js";
import { roomRouter } from "./features/room/routes.js";
import { initSocketServer } from "./infra/socket/server.js";



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

const isProd = process.env.NODE_ENV === "production";

const PORT_RAW = process.env.PORT;
const PORT = PORT_RAW ? Number(PORT_RAW) : NaN;

if (!Number.isFinite(PORT) || PORT <= 0) {
  throw new Error(`Invalid PORT: ${PORT_RAW}`);
}

const HOST = process.env.HOST ?? (isProd ? "0.0.0.0" : "127.0.0.1");

server.listen({port:PORT,host:HOST},() => {
   console.log(`Server running on port ${PORT}:${HOST}`);
});

