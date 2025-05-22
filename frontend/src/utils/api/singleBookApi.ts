import axios from "axios"
// import { BASE_URL } from "../constants/constants"

export const getSingleBook = async (isbn: string) => {
  const { data } = await axios.get(
    `/api/books/by-isbn/${isbn}
`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )
  return data.book.items[0]
}
