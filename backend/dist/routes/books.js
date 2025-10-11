import { Router } from "express";
import { GOOGLE_BOOKAPI_URL, GOOGLE_BOOKAPI, NYTIMES_BOOK_KEY, NYTIMES_BOOK_URL, } from "../utils/secrets.js";
import axios from "axios";
const booksRouter = Router();
// Search books from Google Books API
booksRouter.get("/", async (req, res) => {
    try {
        const url = GOOGLE_BOOKAPI_URL;
        const apiKey = GOOGLE_BOOKAPI;
        if (!apiKey) {
            return res.status(500).json({ message: "Missing Google Books API key." });
        }
        const { category, lang, orderBy, limit = 10, page = 1 } = req.query;
        const searchQuery = category ? String(category) : "books";
        const params = new URLSearchParams({
            q: searchQuery,
            key: apiKey,
        });
        if (lang)
            params.append("langRestrict", String(lang));
        if (orderBy)
            params.append("orderBy", String(orderBy));
        params.append("maxResults", String(limit));
        params.append("startIndex", String((Number(page) - 1) * Number(limit)));
        const fetchUrl = `${url}?${params.toString()}`;
        const response = await axios.get(fetchUrl);
        const itemsPerPage = Number(limit);
        const nextPage = Number(page) + 1;
        const hasNextPage = response.data.items && response.data.items.length === itemsPerPage;
        const respondedData = {
            items: response.data.items || [],
            nextCursor: hasNextPage ? nextPage : null,
        };
        return res.status(200).json(respondedData);
    }
    catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({
                message: error instanceof Error ? error.message : "Unknown error occurred",
            });
        }
        console.error("Failed to send response:", error);
    }
});
// Get book by ISBN from Google Books API
booksRouter.get("/by-isbn/:isbn", async (req, res) => {
    try {
        const { isbn } = req.params;
        const fetchUrl = `${GOOGLE_BOOKAPI_URL}?q=isbn:${isbn}&key=${GOOGLE_BOOKAPI}`;
        const response = await axios.get(fetchUrl);
        const bookData = response.data;
        return res.status(200).json({
            book: bookData,
        });
    }
    catch (error) {
        console.error("Fetch error:", error);
        return res.status(400).json({ message: "Error Fetching Book" });
    }
});
// Get featured books from NYTimes API
booksRouter.get("/featured", async (req, res) => {
    try {
        const fetchUrl = `${NYTIMES_BOOK_URL}/lists/overview.json?api-key=${NYTIMES_BOOK_KEY}`;
        const response = await axios.get(fetchUrl);
        const fetchedData = response.data.results;
        const newLastModified = response.data.results.published_date;
        return res.status(200).json({
            featuredBooks: fetchedData,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error fetching featured books" });
    }
});
// Search books by query
booksRouter.get("/search/:query", async (req, res) => {
    try {
        const { query } = req.params;
        const url = GOOGLE_BOOKAPI_URL;
        const apiKey = GOOGLE_BOOKAPI;
        if (!apiKey) {
            return res
                .status(500)
                .json({ message: "Missing Google Books API key." });
        }
        const params = new URLSearchParams({
            q: query,
            key: apiKey,
            maxResults: "40", // Increased results for better search experience
        });
        const fetchUrl = `${url}?${params.toString()}`;
        const response = await axios.get(fetchUrl);
        const books = response.data.items || [];
        return res.status(200).json({ books });
    }
    catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error searching books",
        });
    }
});
export default booksRouter;
