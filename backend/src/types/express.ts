import type { Request } from "express"
import { UserType } from "../src/db/schema"

export interface RequestWithUser extends Request {
  user?: UserType
}
