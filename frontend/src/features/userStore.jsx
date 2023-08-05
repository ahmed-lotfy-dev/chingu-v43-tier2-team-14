import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const store = (set) => ({
  user: null,
  fetchUserData: async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user`,
      { withCredentials: true }
    );
    set({ user: response.data.user });
  },
  logout: async () => {
    set({ user: null });
  },
});

export const userStore = create(devtools(store));
