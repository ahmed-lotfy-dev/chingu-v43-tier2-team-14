// src/routes/user.ts
import { Router } from "express";
import "../types/express"; // Import the extended Request type
import { authMiddleware } from "../utils/authMiddleware";
const userRouter = Router();
userRouter.get("/me", authMiddleware, (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    res.json({ user: req.user });
});
export default userRouter;
