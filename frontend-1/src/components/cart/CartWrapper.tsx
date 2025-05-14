import CartFooter from "./CartFooter";
import CartItem from "./CartItem";

const CartWrapper = () => {
  const dummyData = [
    {
      id: 1,
      name: "awesome book no. 1",
      author: "dan brown",
      price: 15,
      img: "https://picsum.photos/id/55/700",
    },
    {
      id: 2,
      name: "awesome book no. 2",
      author: "alexander dumas",
      price: 25,
      img: "https://picsum.photos/id/111/700",
    },
    {
      id: 3,
      name: "awesome book no. 3",
      author: "steven king",
      price: 45,
      img: "https://picsum.photos/id/190/700",
    },
  ];

  return (
    <>
      <header className="items-center justify-between hidden w-3/4 p-2 px-24 mb-5 font-semibold capitalize bg-blue-100 lg:flex">
        <div className="book">book</div>
        <div className="price">price</div>
        <div className="quantity">Qty</div>
        <div className="subtotal">Subtotal</div>
      </header>
      {dummyData.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <CartFooter />
    </>
  );
};
export default CartWrapper;

// proceed to checkout
// clear shopping cart
// continue shopping
