import axios from "axios"

export const getSearchResult = async (value: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/books/search-books/${value}`
  )
  return data.books || []
}
