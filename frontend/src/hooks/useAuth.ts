import type { User } from "../types/userType"
import { authClient } from "../utils/auth-client"

const useAuth = () => {
  const { data, isPending, error } = authClient.useSession()

  return {
    user: data?.user as User,
    isAuthenticated: !!data?.user,
    isLoading: isPending,
    error,
  }
}

export default useAuth
