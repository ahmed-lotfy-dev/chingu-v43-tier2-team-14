import { Response, NextFunction } from "express"
import { fromNodeHeaders } from "better-auth/node"
import { auth } from "../utils/auth.js"
import { UserType } from "../db/schema.js" 
import { RequestWithUser } from "../types/express.js"

export async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Add req, res, next parameters and the Promise<void> return type
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (session?.user) {
      req.user = session.user as UserType
      next() // Call next() to pass control
      return // It's good practice to return after calling next()
    }

    // If no session/user, block access
    res.status(401).json({ message: "Unauthorized" })
    return // Ensure function exits
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(500).json({ message: "Internal Server Error" })
    return // Ensure function exits
  }
}
