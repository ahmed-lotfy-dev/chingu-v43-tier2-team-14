import axios from "axios"
import { BASE_URL } from "../constants"

export const getSearchResult = async (value: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/books/search-books/${value}`
  )
  return data.books || []
}
