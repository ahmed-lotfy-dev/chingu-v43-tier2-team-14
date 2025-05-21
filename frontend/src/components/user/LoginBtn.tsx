import { Link } from "react-router"

const Loginbtn = () => {
  return (
    <div className="flex items-center h-4 gap-6 shadow-2xl">
      <Link
        to="/signin"
        className="flex items-center bg-slate-800 text-white text-text-btn rounded-xl px-6 py-2 hover:text-white"
      >
        Login
      </Link>
    </div>
  )
}

export default Loginbtn
