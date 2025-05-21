import { Request, Response } from "express"
import { RequestWithUser } from "../types/express.js"
import { bookService } from "../services/book.service.js"

export class BookController {
  // Create a new book
  async createBook(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const { googleBookId, title, description, pageCount } = req.body
      const newBook = await bookService.createBook({
        googleBookId,
        title,
        description,
        pageCount,
        userId: req.user.id,
      })

      return res.status(201).json(newBook)
    } catch (error) {
      console.error("Error creating book:", error)
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Error creating book",
      })
    }
  }

  // Get all books for a user
  async getUserBooks(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const books = await bookService.getUserBooks(req.user.id)
      return res.status(200).json(books)
    } catch (error) {
      console.error("Error fetching user books:", error)
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Error fetching books",
      })
    }
  }

  // Get a book by ID
  async getBookById(req: Request, res: Response) {
    try {
      const book = await bookService.getBookById(req.params.id)
      if (!book) {
        return res.status(404).json({ message: "Book not found" })
      }
      return res.status(200).json(book)
    } catch (error) {
      console.error("Error fetching book:", error)
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Error fetching book",
      })
    }
  }

  // Update a book
  async updateBook(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const book = await bookService.getBookById(req.params.id)
      if (!book) {
        return res.status(404).json({ message: "Book not found" })
      }

      if (book.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
      }

      const updatedBook = await bookService.updateBook(req.params.id, req.body)
      return res.status(200).json(updatedBook)
    } catch (error) {
      console.error("Error updating book:", error)
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Error updating book",
      })
    }
  }

  // Delete a book
  async deleteBook(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const book = await bookService.getBookById(req.params.id)
      if (!book) {
        return res.status(404).json({ message: "Book not found" })
      }

      if (book.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" })
      }

      await bookService.deleteBook(req.params.id)
      return res.status(204).send()
    } catch (error) {
      console.error("Error deleting book:", error)
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Error deleting book",
      })
    }
  }

  // Add a book to user's collection
  async addToCollection(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const { bookId, status, isFavorite, readProgress } = req.body
      const userBook = await bookService.addUserBook({
        userId: req.user.id,
        bookId,
        status,
        isFavorite,
        readProgress,
      })

      return res.status(201).json(userBook)
    } catch (error) {
      console.error("Error adding book to collection:", error)
      return res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Error adding book to collection",
      })
    }
  }

  // Get user's book collection
  async getCollection(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const { status } = req.query
      const collection = await bookService.getUserBookCollection(
        req.user.id,
        status as string
      )

      return res.status(200).json(collection)
    } catch (error) {
      console.error("Error fetching collection:", error)
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Error fetching collection",
      })
    }
  }

  // Update book status in collection
  async updateCollectionStatus(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const { status, isFavorite, readProgress } = req.body
      const updatedUserBook = await bookService.updateUserBookStatus(
        req.user.id,
        req.params.bookId,
        status,
        isFavorite,
        readProgress
      )

      return res.status(200).json(updatedUserBook)
    } catch (error) {
      console.error("Error updating collection:", error)
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Error updating collection",
      })
    }
  }

  // Remove book from collection
  async removeFromCollection(req: RequestWithUser, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      await bookService.removeUserBook(req.user.id, req.params.bookId)
      return res.status(204).send()
    } catch (error) {
      console.error("Error removing from collection:", error)
      return res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Error removing from collection",
      })
    }
  }

  // Search books
  async searchBooks(req: Request, res: Response) {
    try {
      const { query } = req.params
      const books = await bookService.searchBooks(query)
      return res.status(200).json({ books })
    } catch (error) {
      console.error("Error searching books:", error)
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Error searching books",
      })
    }
  }
}
