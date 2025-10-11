import Express from "express"
import {register,login} from "./controller.js"

export const router = Express.Router()

router.post("/register",register)
router.post("/login",login)



