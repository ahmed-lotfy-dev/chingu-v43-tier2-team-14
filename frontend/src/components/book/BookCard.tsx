import { Link } from "react-router"
import type { GoogleBook } from "../../types/googleBookType"
// import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs"
// import useWishlist from "../../hooks/useWishlist"

type BookCardProps = GoogleBook

const getValidIsbnOrTitle = (
  title: string,
  identifiers?: { type: string; identifier: string }[]
) => {
  if (!identifiers) return encodeURIComponent(title) // fallback to title
  const isbn13 = identifiers.find((id) => id.type === "ISBN_13")
  const isbn10 = identifiers.find((id) => id.type === "ISBN_10")
  return isbn13?.identifier || isbn10?.identifier || encodeURIComponent(title)
}

const BookCard = ({
  // id,
  volumeInfo: {
    title,
    categories,
    // description,
    // authors,
    pageCount,
    imageLinks,
    industryIdentifiers,
  },
}: BookCardProps) => {
  const isbnOrTitle = getValidIsbnOrTitle(title, industryIdentifiers)
  // const { isAdded, addItemToWishlist } = useWishlist(id, title)

  // const item = {
  //   id,
  //   title,
  //   categories,
  //   pageCount,
  //   imageLinks,
  //   description,
  //   authors,
  //   industryIdentifiers,
  // }

  return (
    <article className="flex flex-col justify-between h-full w-full max-w-[250px] border border-slate-300 rounded-md shadow-md bg-white transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl p-4">
      <figure className="flex cursor-pointer mb-2 mx-auto">
        <Link to={`/book/${isbnOrTitle}`}>
          {imageLinks && (
            <img
              src={imageLinks.thumbnail}
              className="h-full w-auto object-contain"
              alt={title}
            />
          )}
        </Link>
      </figure>

      <div className=" text-center flex flex-col items-center space-y-2">
        <h2 className="font-semibold">{title.substr(0, 25)}</h2>
        <p className="px-2 py-0.5 text-xs bg-blue-900/60 text-white rounded-md w-fit">
          {categories?.join(", ") || "not available!"}
        </p>
        <span>{pageCount} pages</span>
        <div
          className="p-3 text-xl flex justify-center w-12 mx-auto cursor-pointer duration-300 text-text-btn hover:text-text-main"
          // onClick={() => addItemToWishlist(item)}
        >
          {/* {!isAdded ? <BsBookmarkPlus /> : <BsBookmarkDashFill />} */}
        </div>
      </div>
    </article>
  )
}
export default BookCard
