import { AiOutlineShoppingCart } from "react-icons/ai";
import NoContent from "../NoContent";

const EmptyCart = () => {
  return (
    <>
      <AiOutlineShoppingCart className="text-6xl" />
      <div>EmptyCart</div>
      <h1>Cart is empty.</h1>
      <NoContent message="You don't have any products added in your cart yet!" />
    </>
  );
};
export default EmptyCart;
