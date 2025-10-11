import { BASE_URL } from "../utils/constants/constants"

type BookStoreState = {
  bookList: any[]
  wishList: any[]
  featuredList: any[]
  getUserWishlist: () => Promise<void>
  addToWishlist: (item: any) => void
  removeFromWishlist: (id: string) => void
  addBookDb: (userId: string, item: any) => Promise<void>
  removeBookDb: (userId: string, id: string) => Promise<void>
}

const BookStore = (
  set: (
    partial:
      | Partial<BookStoreState>
      | ((state: BookStoreState) => Partial<BookStoreState>)
  ) => void
): BookStoreState => ({
  bookList: [],
  wishList: [],
  featuredList: [],

  getUserWishlist: async () => {
    const url = `${BASE_URL}/api/books/get-user-books`
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      set({ wishList: data.books || [] })
    } catch (error) {
      console.error("Error fetching wishlist:", error)
      set({ wishList: [] })
    }
  },

  addToWishlist: (item: any) =>
    set((state) => {
      const wishItemExist = state.wishList.some(
        (wishItem) => wishItem.id === item.id
      )
      if (!wishItemExist) {
        return {
          wishList: [...state.wishList, item],
        }
      }
      return state
    }),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishList: state.wishList.filter((item: any) => item.id !== id),
    })),

  addBookDb: async (userId: string, item: any) => {
    const url = `${BASE_URL}/api/books/add-book`
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId: userId, ...item }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error adding book:", error)
      throw error
    }
  },

  removeBookDb: async (userId: string, id: string) => {
    const url = `${BASE_URL}/api/books/remove-book`
    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ userId, id }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error removing book:", error)
      throw error
    }
  },
})

export default BookStore
