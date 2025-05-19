// src/pages/SignUp.tsx
import { Toaster } from "react-hot-toast"
import SignUpComponent from "../components/UI/SignUpComponent"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router"
import { useEffect } from "react"

const SignUp = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/user")
    }
  }, [user, navigate])
  
  return (
    <section className="w-full flex flex-col justify-start items-start">
      <SignUpComponent />
      <Toaster />
    </section>
  )
}
export default SignUp
