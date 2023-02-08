import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";

export default function ProductUpdate() {
  const {
    state: {
      productDetailData: { image, title, desc, options, category, price },
    },
  } = useLocation();

  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const { updatedProduct } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    updatedProduct.mutate(
      { product },
      {
        onSuccess: () => {
          alert("success");
        },
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <section className="w-full max-w-screen-lg mx-auto text-center p-6">
      <h2 className="text-3xl font-bold uppercase">Add New Product</h2>
      {/* {success && (
        <span className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-beige p-2 box-border text-lg rounded-md">
          ✅ {success}
        </span>
      )} */}
      <div className="mt-10 mx-auto xl:flex">
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="image_file"
            className="w-full max-w-md mx-auto my-5"
          />
        ) : (
          <div className="w-full max-w-md mx-auto my-5">
            <p className="text-left font-bold mb-3 text-lg">Current Image</p>
            <img src={image} alt={title} />
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-xl pt-10 m-auto lg:ml-auto"
        >
          <input
            type="file"
            accept="image/*"
            name="file"
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            value={product.title ?? title}
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={product.price ?? price}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={product.category ?? category}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="desc"
            value={product.desc ?? desc}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="options"
            value={product.options ?? options}
            required
            onChange={handleChange}
          />
          <Button
            text={isUploading ? "Uploading..." : "Edit"}
            disabled={isUploading}
            className="h-14 mt-10"
          />
        </form>
      </div>
    </section>
  );
}
