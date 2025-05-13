import { Request, Response, NextFunction } from "express"
import { fromNodeHeaders } from "better-auth/node"
import { auth } from "../utils/auth.js"

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (session?.user) {
      req.user = session.user
    }

    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    next()
  }
}
