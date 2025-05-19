import { NavLink, useLocation } from "react-router"

export const booksArr = [
  "all",
  "action",
  "adventure",
  "classics",
  "comic",
  "graphic",
  "mystery",
  "horror",
  "romance",
  "sci-fi",
  "suspense",
]

const CategoriesNav = () => {
  const location = useLocation()
  const isAllActive =
    location.pathname === "/books/" ||
    location.pathname === "/books/category/all"

  return (
    <div className="w-full flex flex-wrap justify-center md:justify-start my-5 px-5">
      {booksArr.map((category) => {
        const to = `/books/category/${category}`
        const isActive =
          category === "all" ? isAllActive : location.pathname === to

        return (
          <NavLink key={category} to={to}>
            <p
              className={`cat capitalize rounded-md px-3 py-1 m-1 duration-300 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
            >
              {category}
            </p>
          </NavLink>
        )
      })}
    </div>
  )
}

export default CategoriesNav
