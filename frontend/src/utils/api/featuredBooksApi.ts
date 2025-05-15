import axios from "axios"

export const getFeaturedBooks = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/books/featured-books`
  )
  return data.featuredBooks
}
