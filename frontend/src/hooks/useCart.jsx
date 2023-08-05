import { useState } from "react";
import { userStore } from "../features/userStore";
import { cartStore } from "../features/cartStore";
import toast from "react-hot-toast";

const useCart = (id, title, image, price, author) => {
  const user = userStore((state) => state.user);
  const cart = cartStore((state) => state.cart);
  const addItemToCartState = cartStore((state) => state.addItemToCartState);
  const removeItemFromCartState = cartStore(
    (state) => state.removeItemFromCartState
  );
  const addCartDB = cartStore((state) => state.addCartDB);
  const removeCartDB = cartStore((state) => state.removeCartDB);
  const isOnCart = (id) => cart.find((item) => item.id === id);
  const [isInCart, setIsInCart] = useState(isOnCart(id));

  const alertAdd = (title) => {
    toast.success(`${title} Added to Cart`, {
      position: "top-right",
    });
  };

  const alertRemove = (title) => {
    toast.error(`${title} is removed from Cart`, {
      position: "top-right",
    });
  };

  const noUser = () => {
    toast.error(`Sorry You Have To Be Signed In First`, {
      position: "top-right",
    });
  };

  const addItemToCart = (item) => {
    if (!user) {
      noUser();
      return;
    }
    if (!isOnCart(id)) {
      addItemToCartState(item);
      addCartDB(user._id, item);
      alertAdd(title);
      setIsInCart(!isInCart);
    } else {
      removeItemFromCartState(id);
      removeCartDB(user._id, id);
      alertRemove(title);
      setIsInCart(!isInCart);
    }
  };

  return { addItemToCart, isInCart };
};

export default useCart;
