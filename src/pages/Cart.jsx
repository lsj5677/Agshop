import React from "react";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { AiOutlinePlus } from "react-icons/ai";
import { TbEqual } from "react-icons/tb";
import Button from "../components/ui/Button";
import useCarts from "../hooks/useCarts";

const SHIPPING_PRICE = 5;

export default function Cart() {
  const {
    getItems: { isLoading, data: products },
  } = useCarts();

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="sub-wrap font-serif">
      <h3 className="text-2xl border-b pb-3 mb-3">My Cart</h3>
      {!hasProducts && (
        <p className="text-center text-lg text-gray-500 italic">
          It's Empty, Please Add Products.
        </p>
      )}
      {hasProducts && (
        <div className="flex flex-col">
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>

          <div className="bg-gray-50 text-center rounded-lg py-8 sm:flex justify-around items-center">
            <span className="inline-block border-b border-green text-green px-2 mb-3 sm:mb-0">
              Free shipping over 1,000 CAD
            </span>
            <PriceCard text="Total product price" price={totalPrice} />
            <AiOutlinePlus className="inline-block" />
            <PriceCard
              text="Shipping price"
              price={totalPrice > 2000 ? 0 : SHIPPING_PRICE}
            />
            <TbEqual className="inline-block" />
            <PriceCard text="Total price" price={totalPrice + SHIPPING_PRICE} />
          </div>
          <Button text="Check out" className="mt-6 py-4 text-lg" />
        </div>
      )}
    </section>
  );
}
