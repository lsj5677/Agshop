import React, { useState } from "react";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";

export default function ProductAdd() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addNewProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("Product was added successfully.");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <section className="w-full max-w-screen-lg mx-auto text-center p-6">
      <h2 className="text-3xl font-bold uppercase">Add New Product</h2>
      {success && (
        <span className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-beige p-2 box-border text-lg rounded-md">
          ✅ {success}
        </span>
      )}
      <div className="mt-10 mx-auto xl:flex">
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="image_file"
            className="w-full max-w-md mx-auto my-5"
          />
        ) : (
          <div className="border border-dashed m-auto text-gray-400 lg:w-full lg:max-w-xl ">
            Choose product image on local
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
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            value={product.title ?? ""}
            placeholder="product name"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            placeholder="product price"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={product.category ?? ""}
            placeholder="product category"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="desc"
            value={product.desc ?? ""}
            placeholder="product description"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="options"
            value={product.options ?? ""}
            placeholder="product options (comma[,] separation)"
            required
            onChange={handleChange}
          />
          <Button
            text={isUploading ? "Uploading..." : "Register"}
            disabled={isUploading}
            className="h-14 mt-10"
          />
        </form>
      </div>
    </section>
  );
}
