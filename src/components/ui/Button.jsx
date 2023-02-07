import React from "react";

export default function Button({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={` bg-beige py-1 px-4 rounded hover:bg-brown-light active:bg-brown-dark active:text-beige ${className}`}
    >
      {text}
    </button>
  );
}
