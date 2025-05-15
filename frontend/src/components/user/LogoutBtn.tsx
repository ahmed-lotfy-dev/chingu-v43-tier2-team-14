import { authClient } from "../../utils/auth-client"

const handleLogout = async () => {
  await authClient.signOut()
}

const Logoutbtn = () => {
  return (
    <button
      className="flex items-center bg-slate-800 text-white text-text-btn rounded-xl px-6 py-2 hover:text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default Logoutbtn
