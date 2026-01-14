import Express from "express";
import http from "http"
import dotenv from "dotenv";
import cors from "cors"
import { authRouter } from "./features/auth/routes.js";
import { roomRouter } from "./features/room/routes.js";
import { initSocketServer } from "./socket/server.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config()
// Expressアプリの作成
const app = Express();
// HTTPサーバーを作成し、Expressを使う
const server = http.createServer(app)
// 静的ファイル（HTML/CSS/JSなど)を配信
app.use(Express.static("public"))

app.use(cors({
  origin: ["https://geoturnfight.onrender.com"],
  credentials: true
}));


//Jsonリクエストをパースする
app.use(Express.json())

// ルーターをマウントする
app.use("/api/auth",authRouter)
app.use("/api/room",roomRouter)

export const io = initSocketServer(server)

app.set("io",io)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(Express.static(path.join(__dirname, "../../client/dist")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});


const PORT = process.env.PORT || 4000;


server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}`);
});

