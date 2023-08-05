import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import axios from "axios";

const store = (set) => ({
  bookList: [],
  wishList: [],
  featuredList: [],
  getBooks: async () => {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/books?category=science+fiction`;
    // must add category name for it to work
    // "http://localhost:4000/api/books?category=science+fiction";
    // ?category=category name
    // &limit=40 maximum 40 books
    // &lang=ar
    // &orderBy=newest or relevance

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      set({ bookList: data.categories.items });
    } catch (error) {
      console.error(error);
    }
  },

  // get user wishlist part
  getUserWishlist: async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/books/get-user-books`;

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      set({ wishList: data });
    } catch (error) {
      console.error(error);
    }
  },

  addToWishlist: (item) =>
    set((state) => {
      const wishItemExist = state.wishList.some(
        (wishItem) => wishItem.id === item.id
      );
      if (!wishItemExist) {
        return {
          wishList: [...state.wishList, item],
        };
      }
      return state;
    }),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishList: state.wishList.filter((item) => item.id !== id),
    })),

  addBookDb: async (userId, item) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/books/add-book`;
    fetch(url, {
      method: "post",
      body: JSON.stringify({ userId: userId, ...item }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  removeBookDb: async (userId, id) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/books/remove-book`;
      fetch(url, {
        method: "delete",
        body: JSON.stringify({ userId, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  getFeatured: async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/books/featured-books`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data.featuredBooks.results);
      set({ featuredList: data.featuredBooks.results });
    } catch (error) {
      console.error(error);
    }
  },
});

export const bookStore = create(
  persist(devtools(store), { name: "bookStore" })
);
