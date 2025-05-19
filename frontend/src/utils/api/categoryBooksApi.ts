import axios from "axios"

export const getCategoryBooks = async (category: string, page: number) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/books?category=${category}&lang=en&page=${page}`
  )

  return {
    items: data.items || [],
    nextCursor: data.nextCursor,
  }
}
