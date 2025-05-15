import axios from "axios"

export const getCategoryBooks = async (category: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/books?category=${category}&lang=en`
  )
  return data.categories
}
