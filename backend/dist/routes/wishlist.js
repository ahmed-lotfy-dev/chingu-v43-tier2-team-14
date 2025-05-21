import { Router } from "express";
import { db } from "../db";
import { userBook } from "../db/schema";
import { eq, and } from "drizzle-orm";
const wishlistRouter = Router();
// GET all wishlist items for a user
wishlistRouter.get("/:userId", async (req, res) => {
    try {
        const items = await db
            .select()
            .from(userBook)
            .where(and(eq(userBook.userId, req.params.userId), eq(userBook.status, "wishlist")));
        console.log(items);
        res.json({ wishlist: items });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch wishlist" });
    }
});
// ADD to wishlist
wishlistRouter.post("/", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        await db.insert(userBook).values({
            userId,
            bookId,
            status: "wishlist",
        });
        res.status(201).json({ message: "Book added to wishlist" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to add to wishlist" });
    }
});
// REMOVE from wishlist
wishlistRouter.delete("/", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        await db
            .delete(userBook)
            .where(and(eq(userBook.userId, userId), eq(userBook.bookId, bookId), eq(userBook.status, "wishlist")));
        res.json({ message: "Book removed from wishlist" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to remove from wishlist" });
    }
});
// TOGGLE wishlist status (optional)
wishlistRouter.put("/toggle", async (req, res) => {
    try {
        const { userId, bookId, isFavorite } = req.body;
        await db
            .update(userBook)
            .set({ isFavorite })
            .where(and(eq(userBook.userId, userId), eq(userBook.bookId, bookId), eq(userBook.status, "wishlist")));
        res.json({ message: "Wishlist item updated" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update wishlist item" });
    }
});
export default wishlistRouter;
