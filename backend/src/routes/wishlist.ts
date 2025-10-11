import { Router, Request, Response } from "express"
import { db } from "../db/index.js"
import { book, userBook } from "../db/schema.js"
import { eq, and } from "drizzle-orm"
import { authMiddleware } from "../utils/authMiddleware.js" // Assuming authMiddleware is correctly set up
import { RequestWithUser } from "../types/express.js" // Assuming this type is defined

const wishlistRouter = Router()

// GET all wishlist items for the authenticated user
wishlistRouter.get(
  "/",
  authMiddleware,
  async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      const userId = req.user.id

      const items = await db
        .select()
        .from(userBook)
        .where(
          and(eq(userBook.userId, userId), eq(userBook.status, "wishlist"))
        )

      res.json({ wishlist: items })
    } catch (err) {
      console.error("Failed to fetch wishlist:", err)
      res.status(500).json({ error: "Failed to fetch wishlist" })
    }
  }
)

// ADD to wishlist
wishlistRouter.post(
  "/",
  authMiddleware,
  async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      const userId = req.user.id
      const { bookId } = req.body
      console.log({ userId, bookId })
      if (!bookId || typeof bookId !== "string") {
        return res.status(400).json({ error: "Invalid bookId provided" })
      }

      // Optional: Check if the book is already in the wishlist
      const existingItem = await db
        .select()
        .from(userBook)
        .where(
          and(
            eq(userBook.userId, userId),
            eq(userBook.bookId, bookId),
            eq(userBook.status, "wishlist")
          )
        )
        .limit(1)

      if (existingItem.length > 0) {
        return res
          .status(409)
          .json({ message: "Book already in wishlist", item: existingItem[0] })
      }

      await db.insert(userBook).values({
        userId,
        bookId,
        status: "wishlist",
      })
      res.status(201).json({ message: "Book added to wishlist" })
    } catch (err) {
      console.error("Failed to add to wishlist:", err)
      res.status(500).json({ error: "Failed to add to wishlist" })
    }
  }
)

wishlistRouter.post(
  "/from-google",
  authMiddleware,
  async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      const userId = req.user?.id as string
      const { googleBookId, title, authors, coverUrl, pageCount, description } =
        req.body

      if (!googleBookId || !title) {
        return res.status(400).json({ error: "Missing required book fields" })
      }

      // Try to find book by googleBookId
      const existingBook = await db
        .select()
        .from(book)
        .where(eq(book.googleBookId, googleBookId))
        .limit(1)

      let bookId: string

      if (existingBook.length > 0) {
        bookId = existingBook[0].id
      } else {
        // Insert new book
        const [newBook] = await db
          .insert(book)
          .values({
            googleBookId,
            title,
            authors,
            coverUrl,
            pageCount,
            description,
            userId,
          })
          .returning({ id: book.id })

        bookId = newBook.id
      }

      // Check if it's already in user's wishlist
      const existingUserBook = await db
        .select()
        .from(userBook)
        .where(
          and(
            eq(userBook.userId, userId),
            eq(userBook.bookId, bookId),
            eq(userBook.status, "wishlist")
          )
        )
        .limit(1)

      if (existingUserBook.length > 0) {
        return res.status(409).json({ message: "Book already in wishlist" })
      }

      await db.insert(userBook).values({
        userId,
        bookId,
        status: "wishlist",
      })

      res.status(201).json({ message: "Book added to wishlist", bookId })
    } catch (err) {
      console.error("Failed to add Google Book to wishlist:", err)
      res.status(500).json({ error: "Internal server error" })
    }
  }
)

// REMOVE from wishlist
wishlistRouter.delete(
  "/:bookId",
  authMiddleware,
  async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      const userId = req.user.id
      const { bookId } = req.params

      if (!bookId || typeof bookId !== "string") {
        return res.status(400).json({ error: "Invalid bookId provided" })
      }

      await db
        .delete(userBook)
        .where(
          and(
            eq(userBook.userId, userId),
            eq(userBook.bookId, bookId),
            eq(userBook.status, "wishlist")
          )
        )
      // Check if any row was actually deleted to provide more accurate feedback, or just send 204
      res.status(200).json({ message: "Book removed from wishlist" }) // Or res.status(204).send()
    } catch (err) {
      console.error("Failed to remove from wishlist:", err)
      res.status(500).json({ error: "Failed to remove from wishlist" })
    }
  }
)

// TOGGLE wishlist item's isFavorite status (for a book already in the wishlist)
wishlistRouter.put(
  "/:bookId/toggle-favorite",
  authMiddleware,
  async (req: RequestWithUser, res: Response): Promise<any> => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      const userId = req.user.id
      const { bookId } = req.params
      const { isFavorite } = req.body // Expecting a boolean

      if (typeof isFavorite !== "boolean") {
        return res
          .status(400)
          .json({ error: "Invalid isFavorite value provided" })
      }
      if (!bookId || typeof bookId !== "string") {
        return res.status(400).json({ error: "Invalid bookId provided" })
      }

      await db
        .update(userBook)
        .set({ isFavorite })
        .where(
          and(
            eq(userBook.userId, userId),
            eq(userBook.bookId, bookId)
            // Note: This will update isFavorite regardless of its "wishlist" status.
            // If you only want to toggle favorite for items *in* the wishlist, add: eq(userBook.status, "wishlist")
          )
        )
      res.json({ message: "Wishlist item updated" })
    } catch (err) {
      console.error("Failed to update wishlist item:", err)
      res.status(500).json({ error: "Failed to update wishlist item" })
    }
  }
)

export default wishlistRouter
