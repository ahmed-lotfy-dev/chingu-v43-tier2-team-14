import { AiOutlineHome } from "react-icons/ai"
import { BsBookmark } from "react-icons/bs"
import { GiBookshelf } from "react-icons/gi"
import { BiUserCircle } from "react-icons/bi"
import { AiOutlineShoppingCart } from "react-icons/ai"
import SidebarItem from "./SidebarItem"

const Sidebar = () => {
  return (
    <aside className="sticky pt-10 top-0 h-screen w-16 md:w-24 border-r border-zinc-300 flex flex-col items-center bg-white z-10">
      <SidebarItem icon={<AiOutlineHome />} path="/" />
      <SidebarItem icon={<GiBookshelf />} path="/books" />
      <SidebarItem icon={<BsBookmark />} path="/wishlist" />
      <SidebarItem icon={<BiUserCircle />} path="/logIn" />
      <SidebarItem icon={<AiOutlineShoppingCart />} path="/cart" />
    </aside>
  )
}
GiBookshelf

export default Sidebar
