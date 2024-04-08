import { Link } from "react-router-dom";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import useWishlist from "../../hooks/useWishlist";
import { Toaster } from "react-hot-toast";
const BookCard = ({
  id,
  volumeInfo: {
    title,
    categories,
    description,
    authors,
    pageCount,
    imageLinks,
  },
}) => {
  const { isAdded, addItemToWishlist } = useWishlist(id, title);

  const item = {
    id,
    title,
    categories,
    pageCount,
    imageLinks,
    description,
    authors,
  };

  return (
    <article className="relative card z-10 max-w-xs border bg-zinc-100 border-slate-300 shadow-md rounded-md px-2 py-6 flex flex-col items-center justify-between">
      <figure className="flex cursor-pointer mb-2">
        <Link to={`/book/${id}`}>
          {imageLinks && <img src={imageLinks.thumbnail} alt={title} />}
        </Link>
      </figure>

      <div className="px-4 text-center flex flex-col items-center space-y-2">
        <h2 className="font-semibold">{title.substr(0, 25)}</h2>
        <p className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-md w-fit">
          {categories ? categories : "not available!"}
        </p>
        <span>{pageCount} pages</span>
        <div
          className="p-3 text-xl flex justify-center w-12 mx-auto cursor-pointer duration-300 text-text-btn hover:text-text-main"
          onClick={() => addItemToWishlist(item)}
        >
          {!isAdded ? <BsBookmarkPlus /> : <BsBookmarkDashFill />}
        </div>
      </div>
      <Toaster />
    </article>
  );
};
export default BookCard;
