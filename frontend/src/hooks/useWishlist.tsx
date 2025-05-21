import { useState } from "react"
import { bookStore } from "../features/bookStore"
import { userStore } from "../features/userStore"
import toast from "react-hot-toast"
import type { User } from "../types/userType"

// Define types for wishlist item and user
type WishlistItem = {
  id: string
  title: string
  [key: string]: any
}

const useWishlist = (id: string, title: string) => {
  const user = userStore((state) => state.user as User | undefined)
  const addToWishlist = bookStore((state) => state.addToWishlist) as
    | ((item: WishlistItem) => void)
    | undefined
  const wishList = bookStore((state) => state.wishList) as
    | WishlistItem[]
    | undefined
  const removeFromWishlist = bookStore((state) => state.removeFromWishlist) as
    | ((id: string) => void)
    | undefined
  const addBookDb = bookStore((state) => state.addBookDb) as
    | ((userId: string, item: WishlistItem) => void)
    | undefined
  const removeBookDb = bookStore((state) => state.removeBookDb) as
    | ((userId: string, id: string) => void)
    | undefined

  const isOnWishlist = (id: string) => wishList?.find((item) => item.id === id)
  const [isAdded, setIsAdded] = useState(!!isOnWishlist(id))

  const alertAdd = (title: string) =>
    toast.success(`${title} Added to your wishlist`, {
      position: "top-right",
    })

  const alertRemove = (title: string) =>
    toast.error(`${title} is removed from wishlist`, {
      position: "top-right",
    })

  const addItemToWishlist = (item: WishlistItem) => {
    if (!isOnWishlist(id)) {
      addToWishlist && addToWishlist(item)
      if (user && user.id && addBookDb) {
        addBookDb(user.id, item)
      }
      alertAdd(title)
      setIsAdded(true)
    } else {
      removeFromWishlist && removeFromWishlist(id)
      if (user && user.id && removeBookDb) {
        removeBookDb(user.id, id)
      }
      alertRemove(title)
      setIsAdded(false)
    }
  }

  return { addItemToWishlist, isAdded }
}

export default useWishlist
