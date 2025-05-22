import { createContext, useState, type ReactNode } from "react"
import type { User } from "../types/userType"
import { authClient } from "../utils/auth-client"
import { useNavigate } from "react-router"

type UserContextType = {
  user: User | null
  setUser: (user: User) => Promise<void>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUserState] = useState<User | null>(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  })

  const setUser = async (user: User) => {
    setUserState(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = async () => {
    setUserState(null)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login")
        },
      },
    })
    localStorage.removeItem("user")
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext }
