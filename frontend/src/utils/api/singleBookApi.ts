import axios from "axios"
import { BASE_URL } from "../constants/constants"

const isValidIsbn = (isbn: string) => {
  return /^(97(8|9))?\d{9}(\d|X)$/.test(isbn) // ISBN-10 or ISBN-13
}

export const getSingleBook = async (isbn: string) => {
  try {
    // If it's a valid ISBN, try the ISBN endpoint
    if (isValidIsbn(isbn)) {
      const { data } = await axios.get(
        `${BASE_URL}/api/books/by-isbn/${isbn}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      if (data.book?.items?.[0]) {
        return data.book.items[0]
      }
    }

    // Fallback: decode and search by query string (title or invalid ISBN)
    const decodedQuery = decodeURIComponent(isbn)
    const searchRes = await axios.get(
      `${BASE_URL}/api/books/search/${decodedQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    return searchRes.data.books?.[0] || null
  } catch (error) {
    console.error("Failed to fetch book by ISBN or search:", error)
    return null
  }
}
