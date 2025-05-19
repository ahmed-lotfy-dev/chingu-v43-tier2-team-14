import { AiOutlineHome } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"
import { GiBookshelf } from "react-icons/gi"
import { BiUserCircle } from "react-icons/bi"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useLocation } from "react-router"
import SidebarItem from "./SidebarItem"

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="sticky pt-10 top-0 h-screen w-16 md:w-24 border-r border-zinc-300 flex flex-col items-center bg-white z-10">
      <SidebarItem
        icon={<AiOutlineHome />}
        path="/"
        isActive={location.pathname === "/"}
      />
      <SidebarItem
        icon={<GiBookshelf />}
        path="/books/"
        isActive={location.pathname === "/books/"}
      />
      <SidebarItem
        icon={<BsBookmark />}
        path="/wishlist"
        isActive={location.pathname === "/wishlist"}
      />
      <SidebarItem
        icon={<BiUserCircle />}
        path="/signin"
        isActive={location.pathname === "/user"}
      />
      <SidebarItem
        icon={<AiOutlineShoppingCart />}
        path="/cart"
        isActive={location.pathname === "/cart"}
      />
    </aside>
  )
}

export default Sidebar
