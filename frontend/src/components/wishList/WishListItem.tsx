import React from "react"
import { BsBookmarkDashFill } from "react-icons/bs"
// import toast, { Toaster } from "react-hot-toast"
import { Link } from "react-router"
import type { GoogleBook } from "../../types/googleBookType"

type WishListItemProps ={
  book: GoogleBook
}

const WishListItem: React.FC<WishListItemProps> = ({ book }) => {
  const {
    id,
    volumeInfo: {
      title,
      pageCount,
      authors,
      categories,
      imageLinks,
      // description,
    },
  } = book

  return (
    <article className="...">
      {imageLinks && (
        <Link to={`/book/${id}`}>
          <img src={imageLinks.thumbnail} alt={title} />
        </Link>
      )}
      <div className="...">
        <h2 className="...">{title}</h2>
        <span className="...">{authors?.join(", ")}</span>
        {categories && <p className="...">{categories.join(", ")}</p>}
        <p>{pageCount} pages</p>
      </div>
      <div className="...">
        <BsBookmarkDashFill />
      </div>
    </article>
  )
}

export default WishListItem
