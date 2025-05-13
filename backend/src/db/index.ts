import { drizzle } from "drizzle-orm/node-postgres"
import * as schemas from "./schema"
import * as relations from "./relations"
import { DATABASE_URL } from "../utils/secrets"


const schema = { ...schemas, ...relations }

export const db = drizzle(DATABASE_URL!, { schema })
