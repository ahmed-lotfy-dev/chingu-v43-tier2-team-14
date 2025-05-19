import axios from "axios"
import { BASE_URL } from "../constants"

export const getCategoryBooks = async (category: string, page: number) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/books?category=${category}&lang=en&page=${page}`
  )

  return {
    items: data.items || [],
    nextCursor: data.nextCursor,
  }
}
