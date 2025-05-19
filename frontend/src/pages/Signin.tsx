import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import SigninComponent from "../components/UI/SigninComponent"
import { useNavigate } from "react-router"
import useAuth from "../hooks/useAuth"

const Signin = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/user") // or wherever you want to redirect
    }
  }, [user, isLoading, navigate])

  if (isLoading) return null // or loading spinner

  return (
    <section className="w-full flex flex-col justify-start items-start">
      <SigninComponent />
      <Toaster />
    </section>
  )
}
export default Signin
