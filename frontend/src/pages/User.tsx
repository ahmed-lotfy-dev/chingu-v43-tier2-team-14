// TODO FIX redirect flickering between signin and user 
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router"
  import useAuth from "../hooks/useAuth"

const User = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate("/signin")
    }
  }, [user, , navigate])

  if (!user) return null // or a loader

  return (
    <section className="flex min-h-full flex-1 flex-col px-6 py-10 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">Hello, {user.name}</h1>
      <Toaster />
    </section>
  )
}

export default User
