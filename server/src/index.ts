import Express from "express";
import http from "http"
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import cors from "cors"
import { authRouter } from "./features/auth/routes.js";
import { requireAuth } from "./features/auth/middleware.js";
import { roomRouter } from "./features/room/routes.js";
import { initSocketServer } from "./socket/server.js";

dotenv.config()
// Expressアプリの作成
const app = Express();
// openapi.yml の読み込み
const openapiPath = path.join(process.cwd(), "src/openapi/openapi.yml");
const file = fs.readFileSync(openapiPath, "utf8");
const openapiDoc = YAML.parse(file);
// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc));

// HTTPサーバーを作成し、Expressを使う
const server = http.createServer(app)
// 静的ファイル（HTML/CSS/JSなど)を配信
app.use(Express.static("public"))
// すべてのオリジンを許可（開発用）
app.use(cors());

//Jsonリクエストをパースする
app.use(Express.json())

// ルーターをマウントする
app.use("/api/auth",authRouter)
app.use("/api/room",requireAuth,roomRouter)

export const io = initSocketServer(server)

app.set("io",io)

const PORT = process.env.PORT || 4000;


server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}`);
});

