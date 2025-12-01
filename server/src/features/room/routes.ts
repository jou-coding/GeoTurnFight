import Expres from "express"
import {createRoom, allRooms, findRoom,getRoomId} from "./controller.js"

export const roomRouter = Expres.Router()

roomRouter.post("/createRoom",createRoom)
roomRouter.get("/allRooms",allRooms)
roomRouter.post("/findRoom",findRoom)

// ルームIDを取得するコマンド
roomRouter.get("/getRoomId",getRoomId)
