import { NavLink } from "react-router"

const SidebarItem = ({
  path,
  icon,
  isActive,
}: {
  path: string
  icon: React.ReactNode
  isActive: boolean
}) => {
  return (
    <NavLink to={path} className={`flex mb-8 ${isActive ? "bg-gray-100" : ""}`}>
      <span
        className={`flex justify-center items-center mx-auto w-fit text-2xl md:text-3xl p-2 md:p-3 duration-300 rounded-full ${
          isActive ? "text-blue-500" : ""
        }`}
      >
        {icon}
      </span>
    </NavLink>
  )
}

export default SidebarItem
