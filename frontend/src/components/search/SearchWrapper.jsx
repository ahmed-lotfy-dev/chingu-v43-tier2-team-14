import Loginbtn from "../user/LoginBtn";
import Logoutbtn from "../user/LogoutBtn";
import Userdata from "../user/UserData";
import Search from "./Search";
import { userStore } from "../../features/userStore";

const SearchWrapper = () => {
  const user = userStore((state) => state.user);

  return (
    <div className="w-full col-start-3 row-start-1 row-end-2 mt-5 col-span-full ">
      <div className="flex flex-col items-center justify-around md:flex-row">
        <Search />
        <div>
          {!user ? (
            <Loginbtn />
          ) : (
            <div className="flex items-center h-4 gap-6">
              <Userdata />
              <Logoutbtn />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchWrapper;
