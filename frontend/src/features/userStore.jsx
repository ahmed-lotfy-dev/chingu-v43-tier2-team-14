import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const store = (set) => ({
  user: null,
  fetchUserData: async () => {
    const response = await axios.get(
      `/api/user`,
      { withCredentials: true }
    );
    set({ user: response.data.user });
  },
  logout: async () => {
    set({ user: null });
  },
});

export const userStore = create(devtools(store));
