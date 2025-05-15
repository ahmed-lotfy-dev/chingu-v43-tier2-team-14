import { create } from "zustand"
import { devtools } from "zustand/middleware"

type User = {
  id: string
  name: string
  email: string
}

type UserStore = {
  user: User | null
  setUser: (user: User) => Promise<void>
  logout: () => Promise<void>
}

const store = (set: (partial: Partial<UserStore>) => void): UserStore => ({
  user: null,
  setUser: async (user: any) => {
    set({ user: user })
  },
  logout: async () => {
    set({ user: null })
  },
})

export const userStore = create(devtools(store))
