import { useState } from "react";
import { bookStore } from "../features/bookStore";
import { userStore } from "../features/userStore";
import toast from "react-hot-toast";

const useWishlist = (id, title) => {
  const user = userStore((state) => state.user);
  const addToWishlist = bookStore((state) => state.addToWishlist);
  const wishList = bookStore((state) => state.wishList);
  const removeFromWishlist = bookStore((state) => state.removeFromWishlist);
  const addBookDb = bookStore((state) => state.addBookDb);
  const removeBookDb = bookStore((state) => state.removeBookDb);

  const isOnWishlist = (id) => wishList.find((item) => item.id === id);
  const [isAdded, setIsAdded] = useState(isOnWishlist(id));

  const alertAdd = (title) =>
    toast.success(`${title} Added to your wishlist`, {
      position: "top-right",
    });

  const alertRemove = (title) =>
    toast.error(`${title} is removed from wishlist`, {
      position: "top-right",
    });

  const addItemToWishlist = (item) => {
    if (!isOnWishlist(id)) {
      addToWishlist(item);
      user && addBookDb(user._id, item);
      alertAdd(title);
      setIsAdded(!isAdded);
    } else {
      removeFromWishlist(id);
      user && removeBookDb(user._id, id);
      alertRemove(title);
      setIsAdded(!isAdded);
    }
  };

  return { addItemToWishlist, isAdded };
};

export default useWishlist;
