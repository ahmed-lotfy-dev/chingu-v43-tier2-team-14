import useAuth from "../../hooks/useAuth"

const Userdata = () => {
  const { user } = useAuth()

  return (
    <div className="hidden md:flex justify-center items-center gap-2">
      <img
        className="w-20 h-12 rounded-full"
        src={user?.image ?? undefined}
        alt="user_pic"
      />
      <h2 className="font-semibold">{user?.name}</h2>
    </div>
  )
}

export default Userdata
