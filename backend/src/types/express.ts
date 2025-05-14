import type { Request } from "express"
import { UserType } from "../db/schema"

export interface RequestWithUser extends Request {
  user?: UserType
}
