import axios from "axios"
import { BASE_URL } from "../constants/constants"

export const getFeaturedBooks = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/books/featured`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })

    if (!data.featuredBooks) {
      throw new Error("Invalid response format")
    }

    return data.featuredBooks
  } catch (error) {
    console.error("Error fetching featured books:", error)
    throw error
  }
}
