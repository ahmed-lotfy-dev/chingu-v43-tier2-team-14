//TODO FIX THIS AND CART STORE
import { Toaster } from "react-hot-toast"
import useWishlist from "../../hooks/useWishlist"

import {
  BsBookmarkPlus,
  BsBookmarkDashFill,
  // BsCartXFill,
  // BsCartPlusFill,
} from "react-icons/bs"

// import GenericBtns from "../UI/GenericBtns"
// import useCart from "../../hooks/useCart"

type BookBodyProps = {
  id: string;
  singleBook: {
    title: string;
    categories: string[];
    pageCount: number;
    imageLinks: string;
    description: string;
    authors: string[];
  };
};

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
}: BookBodyProps) => {
  const { addItemToWishlist, isAdded } = useWishlist(id, title)
  // const { addItemToCart, isInCart } = useCart(id, title)

  const item = {
    id,
    title,
    categories,
    pageCount,
    image: imageLinks,
    description,
    author: authors[0],
    // price: saleInfo.amount,
  }
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

      <div
        className="flex justify-between pt-16"
        // onClick={() => addItemToCart(item)}
      >
        {/* <GenericBtns
          title="add to cart"
          // icon={<BsCartPlusFill />}
          icon={!isInCart ? <BsCartPlusFill /> : <BsCartXFill />}
        /> */}
        <div className="flex items-center space-x-4">
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
  )
}
export default BookBody
