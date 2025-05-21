import axios from "axios"
import { BASE_URL } from "../constants"

export const getFeaturedBooks = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/books/featured-books`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
  console.log(data)
  return data.featuredBooks
}
