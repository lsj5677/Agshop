import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, image, title, category, price },
}) {
  const navigate = useNavigate();
  return (
    <li
      className="relative font-serif cursor-pointer transition-all hover:scale-105 "
      onClick={() => {
        navigate(`/shop/product/${id}`, { state: { product } });
      }}
    >
      <div className="w-full bg-beige md:max-w-md">
        <img
          src={image}
          alt={title}
          className="w-full bg-beige md:max-w-md"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <h4 className="text-xl m-2">{title}</h4>
        <span className="text-md">{`${price}.00 CAD`}</span>
      </div>
      <span className="absolute top-2 right-2 text-sm px-2 rounded-lg bg-beige text-brown-light">
        {category}
      </span>
    </li>
  );
}
