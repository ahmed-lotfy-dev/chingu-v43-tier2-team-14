import axios from "axios"
import { BASE_URL } from "../constants/constants"

export const getUserWishList = async (userId: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/wishlist/`,
    {
      params: { userId: userId },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )

  return data.items || []
}
export const addToUserWishList = async (userId: string, bookId: string) => {
  const { data } = await axios.post(
    `${BASE_URL}/api/wishlist/`,
    {
      userId: userId,
      bookId: bookId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )

  return data
}
