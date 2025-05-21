import { authClient } from "../utils/auth-client"

const useAuth = () => {
  const { data: user, isPending, error } = authClient.useSession()

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading: isPending,
    error,
  }
}

export default useAuth
