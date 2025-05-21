// middleware/loggerMiddleware.ts
import expressWinston from "express-winston";
import { logger } from "./logger";
import winston from "winston";
export const requestLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: false,
    expressFormat: false,
    colorize: false,
    format: winston.format.combine(winston.format.printf((info) => {
        const req = info.req;
        const res = info.res;
        const start = req._startTime || new Date();
        const diff = Date.now() - new Date(start).getTime();
        return `${req.method} ${req.url} ${res.statusCode} ${diff}ms`;
    })),
});
export const errorLogger = expressWinston.errorLogger({
    winstonInstance: logger,
});
