import axios from "axios"
// import { BASE_URL } from "../constants/constants"

export const getUserWishList = async (userId: string) => {
  const { data } = await axios.get(
    `/api/wishlist/${userId}
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
