import { create } from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios"

import type { GoogleBook } from "../types/googleBookType"

type CartStoreState = {
  cart: GoogleBook[]
  addItemToCartState: (item: GoogleBook) => void
  removeItemFromCartState: (itemId: string) => void
  syncAddToCart: (userId: string, item: GoogleBook) => Promise<void>
  syncRemoveFromCart: (userId: string, itemId: string) => Promise<void>
  setCart: (items: GoogleBook[]) => void
  clearCart: () => void
}

const useCartStore = create<CartStoreState>()(
  devtools((set,) => ({
    cart: [],

    setCart: (items) => set({ cart: items }),

    clearCart: () => set({ cart: [] }),

    addItemToCartState: (item) =>
      set((state) => {
        const exists = state.cart.some((i) => i.id === item.id)
        if (!exists) {
          return { cart: [...state.cart, item] }
        }
        return state
      }),

    removeItemFromCartState: (itemId) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId),
      })),

    syncRemoveFromCart: async (userId, itemId) => {
      try {
        await axios.post("/api/cart/remove-item-from-cart", {
          userId,
          itemId,
        })
      } catch (err) {
        console.error("Failed to sync remove from cart", err)
        // Optional: rollback logic
      }
    },
  }))
)

export default useCartStore
