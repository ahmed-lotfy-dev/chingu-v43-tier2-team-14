import { RiDeleteBinLine } from "react-icons/ri";
import QuantityCounter from "./QuantityCounter";

const CartItem = ({ name, price, img, author }) => {
  const quantity = 1;
  return (
    <article className="flex flex-col items-center justify-between w-3/4 p-5 mb-5 border-2 border-gray-100 lg:flex-row bg-slate-100 rounded-xl">
      <div className="flex flex-col items-center space-x-4 capitalize lg:flex-row">
        <img src={img} className="w-24 rounded-lg" alt={name} />
        <div className="my-4 text-center lg:text-left lg:my-0">
          <p className="">{name}</p>
          <p className="text-sm font-medium text-cyan-600">{author}</p>
        </div>
      </div>
      <span>${price}</span>
      <QuantityCounter />
      <span>$120</span>

      <RiDeleteBinLine className="mt-5 text-2xl text-red-500 duration-300 cursor-pointer lg:mt-0 hover:text-red-700" />
    </article>
  );
};
export default CartItem;
