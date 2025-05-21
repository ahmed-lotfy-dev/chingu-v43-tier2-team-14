import axios from "axios"
import { BASE_URL } from "../constants"

export const getUserWishList = async (userId: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/wishlist/${userId}
`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  )

  return data.items || []
}
