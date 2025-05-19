import axios from "axios"

export const getSingleBook = async (isbn: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/books/by-isbn/${isbn}
`
  )

  return data.book.items[0]
}
