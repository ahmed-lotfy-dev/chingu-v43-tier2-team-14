import { AiOutlineHome } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { GiBookshelf } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="fixed w-16 min-h-screen col-start-1 col-end-2 py-24 border md:w-24 border-r-zinc-300">
      <SidebarItem icon={<AiOutlineHome />} path="/" />
      <SidebarItem icon={<GiBookshelf />} path="/books" />
      <SidebarItem icon={<BsBookmark />} path="/wishlist" />
      <SidebarItem icon={<BiUserCircle />} path="/logIn" />
      <SidebarItem icon={<AiOutlineShoppingCart />} path="/cart" />
    </aside>
  );
};
GiBookshelf;

export default Sidebar;
