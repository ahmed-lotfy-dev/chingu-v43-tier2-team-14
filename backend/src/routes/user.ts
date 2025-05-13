// src/routes/user.ts
import { Router } from "express"
import "../types/express" // Import the extended Request type
import type { Request as ExpressRequest, Response } from "express"
import type { UserType } from "../db/schema"

import { authMiddleware } from "../utils/authMiddleware"

const userRouter = Router()

interface AuthenticatedRequest extends ExpressRequest {
  user?: UserType
}

userRouter.get(
  "/me",
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" })
      return
    }

    res.json({ user: req.user })
  }
)

export default userRouter
