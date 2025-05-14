import { NavLink } from "react-router"

export const booksArr = [
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
  return (
    <div className="w-full flex flex-wrap justify-center md:justify-start my-5">
      {booksArr.map((category) => (
        <NavLink key={category} to={`/books/category/${category}`}>
          <p className="cat capitalize rounded-md px-3 py-1 m-1 hover:text-white duration-300 hover:bg-red-600">
            {category}
          </p>
        </NavLink>
      ))}
    </div>
  )
}

export default CategoriesNav
