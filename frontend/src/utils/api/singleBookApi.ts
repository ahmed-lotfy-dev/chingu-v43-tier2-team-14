import axios from "axios"
import { BASE_URL } from "../constants"

export const getSingleBook = async (isbn: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/books/by-isbn/${isbn}
`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )
  console.log(BASE_URL)
  return data.book.items[0]
}
