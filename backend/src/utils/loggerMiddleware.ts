// middleware/loggerMiddleware.ts
import expressWinston from "express-winston"
import { logger } from "./logger"
import winston from "winston"
import { Request, Response } from "express"

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  expressFormat: false,
  colorize: false,
  format: winston.format.combine(
    winston.format.printf((info) => {
      const req = info.req as Request
      const res = info.res as Response
      const start = (req as any)._startTime || new Date()
      const diff = Date.now() - new Date(start).getTime()
      return `${req.method} ${req.url} ${res.statusCode} ${diff}ms`
    })
  ),
})

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
})
