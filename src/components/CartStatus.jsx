import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { getCart } from "../api/firebase";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));
  return (
    <div className="relative">
      <AiOutlineShopping className="text-4xl" />
      {products && (
        <span className="absolute inline-block font-xs text-center text-sm leading-[1.8rem] font-cursive w-6 h-6 -bottom-1 -right-1 bg-green text-white rounded-full">
          {products.length}
        </span>
      )}
    </div>
  );
}
