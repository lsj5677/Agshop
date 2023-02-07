import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

export default function Products() {
  const {
    getProducts: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {error && <span>{error}</span>}

      <ul className="sub-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
