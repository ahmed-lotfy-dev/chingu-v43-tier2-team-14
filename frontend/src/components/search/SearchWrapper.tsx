import Loginbtn from "../user/LoginBtn"
import Logoutbtn from "../user/LogoutBtn"
import Userdata from "../user/UserData"
import Search from "./Search"
import useAuth from "../../hooks/useAuth"

const SearchWrapper = () => {
  const { user } = useAuth()

  return (
    <div className=" flex flex-row justify-center items-center md:flex-row gap-3 mt-3 px-8">
      <Search />
      <div>
        {!user ? (
          <Loginbtn />
        ) : (
          <div className="flex justify-center items-center gap-3 h-4">
            <Userdata />
            <Logoutbtn />
          </div>
        )}
      </div>
    </div>
  )
}
export default SearchWrapper
