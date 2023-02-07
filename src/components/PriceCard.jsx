import React from "react";

export default function PriceCard({ text, price }) {
  return (
    <ul>
      <li className="text-sm">{text}</li>
      <li className="text-lg font-bold text-green mt-2">{price} CAD</li>
    </ul>
  );
}
