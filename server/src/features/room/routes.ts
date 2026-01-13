import Expres from "express"
import {createRoom, allRooms, findRoom,getRoomId} from "./controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js"

export const roomRouter = Expres.Router()

roomRouter.post("/createRoom",authMiddleware,createRoom)
roomRouter.get("/allRooms",allRooms)
roomRouter.post("/findRoom",findRoom)

// ルームIDを取得するコマンド
roomRouter.get("/getRoomId",getRoomId)
