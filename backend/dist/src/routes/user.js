// src/routes/user.ts
import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware";
const userRoutes = Router();
userRoutes.get("/me", authMiddleware, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    res.json({ user: req.user });
});
export default userRoutes;
