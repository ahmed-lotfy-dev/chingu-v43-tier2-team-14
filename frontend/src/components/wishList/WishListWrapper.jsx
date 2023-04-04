import { bookStore } from "../../features/bookStore";
import WishListItem from "./WishListItem";
import { AiOutlineHeart } from "react-icons/ai";
import WishEmpty from "./WishEmpty";

const WishListWrapper = () => {
  const wishList = bookStore((state) => state.wishList);

  return (
    <>
      <h2 className="text-4xl capitalize font-bold mb-8">wishlist</h2>
      <p>You have {wishList.length} items in your list!</p>
      {wishList.length > 0 ? (
        wishList.map((wishItem) => (
          <div className="wrapper">
            <WishListItem key={wishItem.id} {...wishItem} />
          </div>
        ))
      ) : (
        <>
          <div className="text-6xl">
            <AiOutlineHeart className="opacity-10 mx-auto" />
          </div>
          <WishEmpty />
        </>
      )}
    </>
  );
};
export default WishListWrapper;
