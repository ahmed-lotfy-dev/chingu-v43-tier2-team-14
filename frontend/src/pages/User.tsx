import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router"
import useAuth from "../hooks/useAuth"
import Loading from "../components/UI/Loading"

const User = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/signin")
    }
  }, [user, isLoading, navigate])

  if (isLoading) return <Loading color="blue" size="large" />
  if (!user) return null

  return (
    <section className="flex min-h-full flex-1 flex-col px-6 py-10 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Hello, {user.name || "User"}
      </h1>
      <Toaster />
    </section>
  )
}

export default User
