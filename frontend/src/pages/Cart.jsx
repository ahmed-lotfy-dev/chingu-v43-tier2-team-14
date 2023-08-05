import CartWrapper from "../components/cart/CartWrapper";
import EmptyCart from "../components/cart/EmptyCart";

const Cart = () => {
  return (
    <section className="flex flex-col items-center justify-start col-start-3 mt-24 col-span-full">
      <CartWrapper />
    </section>
  );
};
export default Cart;
