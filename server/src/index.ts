import Express from "express";
import http from "http"
import { authRouter } from "./features/auth/routes.js";
import { roomRouter } from "./features/room/routes.js";



// Expressアプリの作成
const app = Express();
// HTTPサーバーを作成し、Expressを使う
const server = http.createServer(app)
// 静的ファイル（HTML/CSS/JSなど)を配信
app.use(Express.static("public"))

//Jsonリクエストをパースしていない
app.use(Express.json())

// ルーターをマウントする
app.use("/api/auth",authRouter)
app.use("/api/room",roomRouter)

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
