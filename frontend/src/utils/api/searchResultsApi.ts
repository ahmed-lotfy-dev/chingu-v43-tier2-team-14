import axios from "axios"
import { BASE_URL } from "../constants"

export const getSearchResult = async (value: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/books/search/${value}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )
  return data.books || []
}
