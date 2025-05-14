import { drizzle } from "drizzle-orm/node-postgres"
import * as schemas from "./schema.js"
import * as relations from "./relations.js"
import { DATABASE_URL } from "../utils/secrets.js"


const schema = { ...schemas, ...relations }

export const db = drizzle(DATABASE_URL!, { schema })
