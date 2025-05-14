import { Response, NextFunction } from "express"
import { RequestWithUser } from "../types/express.js"

export function requireAuth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  next()
}
