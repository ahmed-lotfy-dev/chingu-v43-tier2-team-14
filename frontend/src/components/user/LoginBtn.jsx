import React from "react"

const handleSignIn = async () => {
  localStorage.setItem("isAuthenticated", true)
}
const Loginbtn = () => {
  return (
    <div className="flex items-center h-4 gap-6">
      <a
        className="flex items-center bg-bg-btn text-text-btn rounded-full px-6 py-2 hover:text-white"
        href={`/api/auth/google`}
        onClick={handleSignIn}
      >
        Login
      </a>
    </div>
  )
}

export default Loginbtn
