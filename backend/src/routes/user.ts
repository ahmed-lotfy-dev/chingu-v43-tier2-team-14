// src/routes/user.ts
import { Router } from "express"
import { Request, Response } from "express"

import { authMiddleware } from "../utils/authMiddleware"

const userRoutes = Router()

userRoutes.get("/me", authMiddleware, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  res.json({ user: req.user })
})

export default userRoutes
