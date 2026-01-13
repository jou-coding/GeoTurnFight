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
// HTTPサーバーを作成し、Expressを使う
const server = http.createServer(app)
// 静的ファイル（HTML/CSS/JSなど)を配信
app.use(Express.static("public"))

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));


//Jsonリクエストをパースする
app.use(Express.json())

// ルーターをマウントする
app.use("/api/auth",authRouter)
app.use("/api/room",roomRouter)

export const io = initSocketServer(server)

app.set("io",io)

const PORT = process.env.PORT || 4000;


server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}`);
});

