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

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: async (user: any) => {
    set({ user: user })
  },
  logout: async () => {
    set({ user: null })
    await authClient.logout()
  },
}))
