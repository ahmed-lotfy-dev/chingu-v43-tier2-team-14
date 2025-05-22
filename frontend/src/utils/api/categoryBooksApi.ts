import axios from "axios"
import { BASE_URL } from "../constants/constants"

export const getCategoryBooks = async (category: string, page: number) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/books?category=${category}&lang=en&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )

  return {
    items: data.items || [],
    nextCursor: data.nextCursor,
  }
}
