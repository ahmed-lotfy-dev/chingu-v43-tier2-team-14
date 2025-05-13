import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth.js";
export async function authMiddleware(req, res, next) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (session?.user) {
            req.user = session.user;
        }
        next();
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        next();
    }
}
