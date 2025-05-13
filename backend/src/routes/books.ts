import express from "express"
import { Request, Response, NextFunction } from "express"

import fetch from "node-fetch"
import {
  GOOGLE_BOOKAPI_URL,
  GOOGLE_BOOKAPI,
  NYTIMES_BOOK_KEY,
  NYTIMES_BOOK_URL,
  NYTIMES_BOOK_SECRET,
} from "../utils/secrets.js"

const router = express.Router()

/**
 * @swagger
 * /api/books/featured-books:
 *   get:
 *     summary: Get Featured Books
 *     description: Retrieve featured books for the app's home screen.
 *     responses:
 *       '200':
 *         description: A list of featured books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 featuredBooks:
 *                   type: object  # Update with the appropriate schema definition */

router.get(
  "/featured-books",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const fetchUrl = `${NYTIMES_BOOK_URL}/lists/full-overview.json?api-key=${NYTIMES_BOOK_KEY}`
      const fetchUrl = `${NYTIMES_BOOK_URL}/lists/overview.json?api-key=${NYTIMES_BOOK_KEY}`
      const response = await fetch(fetchUrl)
      const data = await response.json()
      return res
        .status(200)
        .json({ message: "books fetched successfully", featuredBooks: data })
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }
)

/**
 * @swagger
 * /api/books/single-book/{title}:
 *   get:
 *     summary: Get Single Book
 *     description: Retrieve details of a single book by title.
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         example: atomic habits
 *         description: The title of the book.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Details of the requested book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Update with the appropriate schema definition
 */

router.get(
  "/single-book/:title",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.params
      const url = GOOGLE_BOOKAPI_URL
      const apiKey = GOOGLE_BOOKAPI
      const response = await fetch(
        `${url}?q=${title}&maxResults=1&key=${apiKey}`
      )
      const data = await response.json()
      console.log(data)

      console.log("from inside singlebook title")
      res.status(200).json({ singleBook: data })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

/**
 * @swagger
 * /api/books/search-books/{query}:
 *   get:
 *     summary: Search Books
 *     description: Search books by query.
 *     parameters:
 *       - in: path
 *         name: query
 *         example: atomic habits
 *         required: true
 *         description: The search query.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of books matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Update with the appropriate schema definition
 */

router.get(
  "/search-books/:query",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.params
      const url = GOOGLE_BOOKAPI_URL
      const apiKey = GOOGLE_BOOKAPI
      const response = await fetch(
        `${url}?q=${query}+intitle:${query}&key=${apiKey}`
      )
      const data = await response.json()
      console.log("from inside search-books intitle")
      res.status(200).json({ books: data })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

/**
 * @swagger
 * /api/books/get-user-books/{userId}:
 *   get:
 *     summary: Get User's Books
 *     description: Retrieve books belonging to a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         example: 642dd4c9aed2cb97ff5250d6
 *         description: The ID of the user whose books are to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of books belonging to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Update with the appropriate schema definition
 */

router.get(
  "/get-user-books/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params // Retrieve userId from path parameters
      const user = await User.findOne({ _id: userId }).populate("books")
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      res
        .status(200)
        .json({ message: "User Books Fetched Successfully", books: user.books })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

/**
 * @swagger
 * /api/books/add-book:
 *   post:
 *     summary: Add a new book to the user's collection
 *     description: Add a new book to the collection of books associated with a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "642dd4c9aed2cb97ff5250d6"
 *                 description: The ID of the user to whom the book belongs.
 *               id:
 *                 type: string
 *                 example: "fFCjDQAAQBAJ"
 *                 description: The ID of the book.
 *               title:
 *                 type: string
 *                 example: "Atomic Habits"
 *                 description: The title of the book.
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Self-Help"]
 *                 description: Array of categories the book belongs to.
 *               pageCount:
 *                 type: integer
 *                 example: 234
 *                 description: The number of pages in the book.
 *               imageLinks:
 *                 type: object
 *                 properties:
 *                   smallThumbnail:
 *                     type: string
 *                     example: "http://books.google.com/books/content?id=fFCjDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
 *                   thumbnail:
 *                     type: string
 *                     example: "http://books.google.com/books/content?id=fFCjDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
 *                 description: Links to the book's images.
 *               description:
 *                 type: string
 *                 example: "THE PHENOMENAL INTERNATIONAL BESTSELLER: OVER 15 MILLION COPIES SOLD WORLDWIDE Transform your life with tiny changes in behaviour, starting now. People think that when you want to change your life, you need to think big. But world-renowned habits expert James Clear has discovered another way..."
 *                 description: Description of the book.
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["James Clear"]
 *                 description: Array of authors of the book.
 *     responses:
 *       '200':
 *         description: Book added successfully
 *       '400':
 *         description: Bad request. Error message included in the response body.
 */

router.post(
  "/add-book",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        userId,
        id,
        title,
        categories,
        pageCount,
        imageLinks,
        description,
        authors,
      } = req.body
      const user = await User.findOne({ _id: userId })
      if (!user) return res.status(404).json({ message: "User Not Found" })

      const isExisted = await Book.findOne({ bookId: id })
      if (isExisted)
        return res.status(400).json({ message: "Book Allready Existed " })

      const book = await Book.create({
        bookId: id,
        title,
        categories,
        pageCount,
        imageLinks,
        description,
        authors,
        userId: user._id,
      })
      user.books.push(book)
      await user.save()
      res.status(200).json({ message: "Book Added Successfully", book: book })
    } catch (error) {
      res.status(401).json({ message: error.message })
      console.error(error)
    }
  }
)

/**
 * @swagger
 * /api/books/remove-book:
 *   delete:
 *     summary: Remove a book from the user's collection
 *     description: Remove a book from the collection of books associated with a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user from whom the book will be removed.
 *               id:
 *                 type: string
 *                 description: The ID of the book to be removed.
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *       '400':
 *         description: Bad request. Error message included in the response body.
 *       '404':
 *         description: Book or user not found
 */

router.delete(
  "/remove-book",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, id } = req.body
      const book = await Book.findOneAndDelete({ bookId: id, userId: userId })
      if (!book) {
        return res.status(404).json({ message: "Book not found" })
      }
      const user = await User.findOne({ _id: userId })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      const bookIndex = user.books.indexOf(book._id)
      if (bookIndex === -1) {
        return res
          .status(404)
          .json({ message: "Book not found in user's collection" })
      }
      user.books.splice(bookIndex, 1)
      await user.save()
      res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {
      res.status(400).json({ message: error.message })
      console.error(error)
    }
  }
)

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get details of a book by its ID
 *     description: Retrieve details of a book by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         example: fFCjDQAAQBAJ
 *         required: true
 *         description: The ID of the book to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Update with the appropriate schema definition
 *       '400':
 *         description: Error fetching book. Error message included in the response body.
 */

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const url = GOOGLE_BOOKAPI_URL
    const apiKey = GOOGLE_BOOKAPI
    const fetchUrl = `${url}/${id}?key=${apiKey}`

    const response = await fetch(fetchUrl)
    const data = await response.json()
    res.status(200).json({ message: "Book Fetched Successfully", Book: data })
  } catch (error) {
    res.status(400).json({ message: "Error Fetching Book" })
  }
})

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get books based on query parameters
 *     description: Retrieve books based on various query parameters like category, language, etc.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of books to filter by.
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: Language restriction for the books.
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Order books by a certain criteria.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of books to return.
 *       - in: query
 *         name: index
 *         schema:
 *           type: integer
 *         description: Starting index for paginated results.
 *     responses:
 *       '200':
 *         description: Books fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Update with the appropriate schema definition
 *       '400':
 *         description: Error fetching books. Error message included in the response body.
 */

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = GOOGLE_BOOKAPI_URL
    const apiKey = GOOGLE_BOOKAPI
    let fetchUrl = `${url}?q=`

    if ("category" in req.query) {
      const { category } = req.query
      fetchUrl += `${category}`
    }

    if ("lang" in req.query) {
      const { lang } = req.query
      fetchUrl += `&langRestrict=${lang}`
    }

    if ("orderBy" in req.query) {
      const { orderBy } = req.query
      fetchUrl += `&orderBy=${orderBy}`
    }

    if ("limit" in req.query) {
      const { limit } = req.query
      fetchUrl += `&maxResults=${limit}`
    }

    if ("index" in req.query) {
      const { index } = req.query
      fetchUrl += `&startIndex=${index}`
    }
    const response = await fetch(`${fetchUrl}&key=${apiKey}`)
    const data = await response.json()
    res.status(200).json({ categories: data })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
