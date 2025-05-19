import axios from "axios"
import { BASE_URL } from "../constants"

export const getFeaturedBooks = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/books/featured-books`)
  console.log(data)
  return data.featuredBooks
}
