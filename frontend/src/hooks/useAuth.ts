import { useEffect } from "react"
import { authClient } from "../utils/auth-client"
import { userStore } from "../features/userStore"

const useAuth = () => {
  const { data, isPending, error } = authClient.useSession()
  const user = userStore((state) => state.user)
  const setUser = userStore((state) => state.setUser)
  const logOut = userStore((state) => state.logout)

  useEffect(() => {
    if (data?.user && !user && typeof setUser === "function") {
      setUser(data.user)
    }
  }, [data?.user, user, setUser])

  return {
    user: user ?? null,
    logOut,
    isAuthenticated: !!user,
    isLoading: isPending,
    error,
  }
}

export default useAuth
