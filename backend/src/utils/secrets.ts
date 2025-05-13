import { config } from "dotenv"
config()

export const PORT = process.env.PORT
export const HTTPS_PORT = process.env.HTTPS_PORT
export const GOOGLE_BOOKAPI = process.env.GOOGLE_BOOKAPI
export const GOOGLE_BOOKAPI_URL = process.env.GOOGLE_BOOKAPI_URL
export const APP_HOME = process.env.APP_HOME
export const NYTIMES_BOOK_KEY = process.env.NYTIMES_BOOK_KEY
export const NYTIMES_BOOK_SECRET = process.env.NYTIMES_BOOK_SECRET
export const NYTIMES_BOOK_URL = process.env.NYTIMES_BOOK_URL

export const DATABASE_URL = process.env.DATABASE_URL
export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET
export const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
