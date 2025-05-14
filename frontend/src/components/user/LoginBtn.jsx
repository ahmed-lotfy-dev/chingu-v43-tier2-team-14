import React from "react"
import { authClient } from "../../utils/auth-client"

const handleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    redirect: true,
  })

  console.log(data)
  localStorage.setItem("isAuthenticated", true)
}
const Loginbtn = () => {
  return (
    <div className="flex items-center h-4 gap-6">
      <button
        className="flex items-center bg-bg-btn text-text-btn rounded-full px-6 py-2 hover:text-white"
        onClick={handleSignIn}
      >
        Login
      </button>
    </div>
  )
}

export default Loginbtn
