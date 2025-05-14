import React from "react"
import { BsBookmarkDashFill } from "react-icons/bs"
import { bookStore } from "../../features/bookStore"
import toast, { Toaster } from "react-hot-toast"
import { Link } from "react-router"

interface WishListItemProps {
  id: string
  title: string
  pageCount: number
  authors?: string[]
  categories?: string[]
  description?: string
  imageLinks?: {
    thumbnail: string
  }
}

const WishListItem: React.FC<WishListItemProps> = ({
  title,
  id,
  pageCount,
  authors,
  categories,
  // description,
  imageLinks,
}) => {
  const removeFromWishlist = bookStore((state) => state.removeFromWishlist)

  const removeItemFromWishlist = (id: string) => {
    if (removeFromWishlist) {
      removeFromWishlist(id)
      toast.error(`${title} has been removed from your wish list`, {
        position: "top-right",
      })
    }
  }

  return (
    <article className="w-3/4 xl:w-1/2 mx-auto shadow-md bg-zinc-100 flex flex-col md:flex-row justify-center md:justify-around items-center my-6 py-4 md:p-4 space-x-4 border-2 rounded-md hover:shadow-sm">
      {imageLinks && (
        <Link to={`/book/${id}`}>
          <img src={imageLinks.thumbnail} alt={title} />
        </Link>
      )}

      <div className="flex flex-col p-4 flex-1 space-y-4 text-center md:text-left">
        <h2 className="text-xl tracking-wider font-bold">{title}</h2>
        <span className="text-red-600 font-semibold">
          {authors?.join(", ")}
        </span>
        {categories && (
          <p className="px-2 py-0.5 mx-auto text-xs bg-red-500 text-white rounded-md md:ml-0 w-fit">
            {categories.join(", ")}
          </p>
        )}
        <p>{pageCount} pages</p>
      </div>
      <div
        className="cursor-pointer text-2xl p-4 duration-300 self-end hover:text-slate-600"
        onClick={() => removeItemFromWishlist(id)}
      >
        <BsBookmarkDashFill />
      </div>
      <Toaster />
    </article>
  )
}

export default WishListItem
