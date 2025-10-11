import Expres from "express"
import {createRoom, allRooms, findRoom} from "./controller.js"

export const roomRouter = Expres.Router()

roomRouter.post("/createRoom",createRoom)
roomRouter.get("/allRooms",allRooms)
roomRouter.get("/findRoom",findRoom)
