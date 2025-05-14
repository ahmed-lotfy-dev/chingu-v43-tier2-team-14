// src/routes/user.ts
import { Router } from "express"
import "../types/express.js"
import type { Request, Response } from "express"
import { RequestWithUser } from "../types/express"
import { authMiddleware } from "../utils/authMiddleware.js"

const userRouter = Router()

userRouter.get("/me", authMiddleware, (req: RequestWithUser, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  res.json({ user: req.user })
})

export default userRouter
