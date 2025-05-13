import { UserType } from "../db/schema"
import type { Request } from "express"

declare global {
  namespace Express {
    interface Request {
      user?: UserType
    }
  }
}
