import axios from "axios"

export const getUserWishList = async (userId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${userId}
`
  )

  return data.items || []
}
