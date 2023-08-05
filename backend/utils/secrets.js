import { config } from "dotenv"
config()

export const PORT = process.env.PORT
export const HTTPS_PORT = process.env.HTTPS_PORT
export const MONGO_URI = process.env.MONGO_URI
export const GOOGLE_ID = process.env.GOOGLE_ID
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET
export const GOOGLE_BOOKAPI = process.env.GOOGLE_BOOKAPI
export const SESSION_SECRET = process.env.SESSION_SECRET
export const GOOGLE_BOOKAPI_URL = process.env.GOOGLE_BOOKAPI_URL
export const APP_HOME = process.env.APP_HOME
export const NYTIMES_BOOK_KEY = process.env.NYTIMES_BOOK_KEY
export const NYTIMES_BOOK_SECRET = process.env.NYTIMES_BOOK_SECRET
export const NYTIMES_BOOK_URL = process.env.NYTIMES_BOOK_URL

