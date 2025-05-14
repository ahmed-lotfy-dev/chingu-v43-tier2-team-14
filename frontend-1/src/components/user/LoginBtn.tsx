import { authClient } from "../../utils/auth-client"

const handleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  })

  console.log(data)
}
const Loginbtn = () => {
  return (
    <div className="flex items-center h-4 gap-6 shadow-2xl">
      <button
        className="flex items-center bg-slate-800 text-white text-text-btn rounded-xl px-6 py-2 hover:text-white"
        onClick={handleSignIn}
      >
        Login
      </button>
    </div>
  )
}

export default Loginbtn
