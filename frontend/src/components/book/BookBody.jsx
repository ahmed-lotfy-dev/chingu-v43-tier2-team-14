import { Toaster } from "react-hot-toast";
import useWishlist from "../../hooks/useWishlist";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";

const BookBody = ({
  id,
  singleBook: {
    title,
    categories,
    pageCount,
    imageLinks,
    description,
    authors,
  },
}) => {
  const { addItemToWishlist, isAdded } = useWishlist(id, title);

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
    <article className="flex flex-col space-y-4">
      {title && (
        <h2 className="text-xl font-bold leading-tight tracking-widest text-center md:text-4xl lg:text-left">
          {title}
        </h2>
      )}

      {authors && (
        <div className="font-semibold text-red-500 capitalize">
          {authors[0]}
        </div>
      )}

      {categories && (
        <p className="px-2 py-0.5 text-xs bg-green-500 text-white rounded-md w-fit">
          {categories[0]}
        </p>
      )}
      {description && (
        <p className="leading-7">{description.substring(0, 250)}</p>
      )}

      {pageCount && (
        <span className="px-3 py-1 text-xs font-bold text-white capitalize bg-orange-500 rounded-md w-fit">
          pages count: {pageCount}
        </span>
      )}

      <div className="flex justify-between pt-16">
        {/*         <GenericBtns title="add to cart" icon={<BsCartPlusFill />} />
         */}{" "}
        <div className="flex items-center space-x-4">
          {/*           experimental
           */}{" "}
          <div
            className="flex justify-center w-12 p-3 mx-auto text-xl duration-300 cursor-pointer text-text-btn hover:text-text-main"
            onClick={() => addItemToWishlist(item)}
          >
            {!isAdded ? <BsBookmarkPlus /> : <BsBookmarkDashFill />}
          </div>
        </div>
      </div>
      <Toaster />
    </article>
  );
};
export default BookBody;
