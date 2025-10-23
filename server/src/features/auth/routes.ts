import Express from "express"
import {register,login} from "./controller.js"

export const authRouter = Express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)



