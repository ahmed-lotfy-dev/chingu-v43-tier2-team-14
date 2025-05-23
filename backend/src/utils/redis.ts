import Redis from "ioredis"

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL environment variable is not set")
}
export const redisClient = new Redis(process.env.REDIS_URL as string)
