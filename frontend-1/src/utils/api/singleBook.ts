import axios from "axios"

export const getSingleBook = async (id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/books/${id}
`
  )
  return data.categories
}
