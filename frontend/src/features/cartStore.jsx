import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const store = (set) => ({
  cart: [],
  getCart: async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart/get-cart-items`,
      {
        userId: userId,
      }
    );
    set({ cart: response });
  },

  addItemToCartState: (item) =>
    set((state) => {
      const cartItemExist = state.cart.some(
        (cartItem) => cartItem.id === item.id
      );
      if (!cartItemExist) {
        return {
          cart: [...state.cart, item],
        };
      }
      return state;
    }),

  removeItemFromCartState: async (item) => {
    set((state) => {
      return { ...state.cart, item };
    });
  },

  addCartDB: async function (userId, item) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart/add-item-to-cart`,
      { userId: userId, item }
    );
    set((state) => ({ ...state.cart, response }));
  },

  removeCartDB: async (userId) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart/remove-item-from-cart`,
      {
        userId: userId,
      }
    );
    set({ response });
  },
});

export const cartStore = create(devtools(store));
