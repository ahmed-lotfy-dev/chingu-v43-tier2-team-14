import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth.js";
export async function authMiddleware(req, res, next) {
    // Add req, res, next parameters and the Promise<void> return type
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (session?.user) {
            req.user = session.user;
            next(); // Call next() to pass control
            return; // It's good practice to return after calling next()
        }
        // If no session/user, block access
        res.status(401).json({ message: "Unauthorized" });
        return; // Ensure function exits
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return; // Ensure function exits
    }
}
