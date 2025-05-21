import { create } from "zustand"
import type { User } from "../types/userType"

type UserStore = {
  user: User | null
  setUser: (user: User) => Promise<void>
  logout: () => Promise<void>
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: async (user: any) => {
    set({ user: user })
  },
  logout: async () => {
    set({ user: null })
  },
}))
