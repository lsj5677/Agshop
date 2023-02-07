import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import useCarts from "../hooks/useCarts";

const ICON_STYLE = "border border-gray-900 w-5 h-5 cursor-pointer";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { addOrUpdateItem, removeItem } = useCarts();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const handlePlus = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(id);
  return (
    <li className="flex justify-between items-center border-b my-4 pb-4">
      <img src={image} alt={title} className=" w-32" />
      <div className="flex-auto sm:flex justify-between items-center">
        <div className="flex-auto pl-10">
          <h4 className="text-lg font-bold">{title}</h4>
          <p className="text-sm text-brown-dark italic">option: {option}</p>
          <p className="mt-5">{price} CAD</p>
        </div>
        <div className="flex items-center pl-10 mt-10 sm:pl-0 sm:mt-0">
          <AiOutlineMinus onClick={handleMinus} className={ICON_STYLE} />
          <span className="px-4">{quantity}</span>
          <AiOutlinePlus onClick={handlePlus} className={ICON_STYLE} />
          <RiDeleteBin2Line
            onClick={handleDelete}
            className="text-2xl text-gray-400 ml-4 cursor-pointer"
          />
        </div>
      </div>
    </li>
  );
}
