//TODO FIX THIS AND CART STORE

import {
  BsBookmarkPlus,
  // BsBookmarkDashFill,
  // BsCartXFill,
  BsCartPlusFill,
} from "react-icons/bs"

//TODO FIX THIS AND CART STORE


import GenericBtns from "../UI/GenericBtns"
import useCartStore from "../../features/cartStore"
import type { GoogleBook } from "../../types/googleBookType"

type BookBodyProps = {
  singleBook: GoogleBook // Accept the full GoogleBook object
}

const BookBody = ({
  singleBook, // Accept the full GoogleBook object
}: BookBodyProps) => {
  // Remove the item object creation as we will use singleBook directly
  // const item = {
  //   id,
  //   title,
  //   categories,
  //   pageCount,
  //   image: imageLinks,
  //   description,
  //   author: authors,
  //   // price: saleInfo.amount,
  // }

  const { addItemToCartState } = useCartStore()
  const handleAddToCart = (item: GoogleBook) => {
    addItemToCartState(item)
  }

  const handleAddToWishlist = () => {
    // Logic to add item to wishlist
  }


  return (
    <article className="flex flex-col space-y-4">
      {singleBook.volumeInfo?.title && (
        <h2 className="text-xl font-bold leading-tight tracking-widest text-center md:text-4xl lg:text-left">
          {singleBook.volumeInfo.title}
        </h2>
      )}

      {singleBook.volumeInfo?.authors && (
        <div className="font-semibold text-red-500 capitalize">{singleBook.volumeInfo.authors}</div>
      )}

      {singleBook.volumeInfo?.categories && singleBook.volumeInfo.categories.length > 0 && (
        <p className="px-2 py-0.5 text-xs bg-green-500 text-white rounded-md w-fit">
          {singleBook.volumeInfo.categories[0]}
        </p>
      )}
      {singleBook.volumeInfo?.description && (
        <p className="leading-7">{singleBook.volumeInfo.description.substring(0, 250)}</p>
      )}

      {singleBook.volumeInfo?.pageCount && (
        <span className="px-3 py-1 text-xs font-bold text-white capitalize bg-orange-500 rounded-md w-fit">
          pages count: {singleBook.volumeInfo.pageCount}
        </span>
      )}

      <div
        className="flex justify-between pt-16"
        onClick={() => handleAddToCart(singleBook)}
      >
        <GenericBtns
          title="add to cart"
          icon={<BsCartPlusFill />}
          // icon={!isInCart ? <BsCartPlusFill /> : <BsCartXFill />}
        />
        <div className="flex items-center space-x-4">
          <div
            className="flex justify-center w-12 p-3 mx-auto text-xl duration-300 cursor-pointer text-text-btn hover:text-text-main"
            onClick={() => handleAddToWishlist()}
          >
            <BsBookmarkPlus />
            {/* {!isAdded ? <BsBookmarkPlus /> : <BsBookmarkDashFill />} */}
          </div>
        </div>
      </div>
    </article>
  )
}

export default BookBody
