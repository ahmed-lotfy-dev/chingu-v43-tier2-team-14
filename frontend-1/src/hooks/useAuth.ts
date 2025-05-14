import { authClient } from "../utils/auth-client"

const useAuth = () => {
  const { data, isPending, error } = authClient.useSession()
  console.log({ data, isPending, error })

  return {
    user: data?.user ?? null,
    isAuthenticated: !!data?.user,
    error,
  }
}

export default useAuth
