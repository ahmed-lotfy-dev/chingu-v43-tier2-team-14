import { create } from "zustand"
import { authClient } from "../utils/auth-client"

type User = {
  id: string
  name: string
  email: string
  image: string
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
    await authClient.logout()
  },
})

export const userStore = create(store)
