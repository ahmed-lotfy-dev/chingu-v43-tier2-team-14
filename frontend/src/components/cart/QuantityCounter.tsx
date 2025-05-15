import { useState } from "react";

const QuantityCounter = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center w-24 px-3 py-1 my-4 space-x-2 font-semibold border border-gray-400 lg:my-0">
      <span
        className="flex-1 text-lg text-green-500 duration-500 cursor-pointer hover:text-green-700"
        onClick={increase}
      >
        +
      </span>
      <p className="flex items-center justify-center text-xl text-center rounded-sm text-slate-800 ">
        {quantity}
      </p>
      <span
        className="flex-1 text-lg text-red-500 duration-500 cursor-pointer hover:text-red-700"
        onClick={decrease}
      >
        -
      </span>
    </div>
  );
};
export default QuantityCounter;
