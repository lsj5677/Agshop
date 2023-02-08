import React, { useEffect, useState } from "react";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductAdd() {
  const [product, setProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addNewProduct, updatedProduct } = useProducts();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    getProducts: { data: products },
  } = useProducts();

  useEffect(() => {
    if (id) {
      let findProduct = products.find((product) => product.id === id);
      setSelectedProduct(findProduct);
      setProduct(findProduct);
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    if (!id) {
      setProduct((product) => ({ ...product, [name]: value }));
    } else {
      setProduct((product) => ({ ...product, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        if (!id) {
          addNewProduct.mutate(
            { product, url },
            {
              onSuccess: () => {
                setSuccess("Product was added successfully.");
                setTimeout(() => {
                  setSuccess(null);
                }, 4000);
                navigate("/shop");
              },
            }
          );
        } else {
          updatedProduct.mutate(
            { product, url },
            {
              onSuccess: () => {
                setSuccess("Product was added successfully.");
                setTimeout(() => {
                  setSuccess(null);
                }, 4000);
                navigate("/shop");
              },
            }
          );
        }
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
          <>
            {selectedProduct.image ? (
              <img
                src={selectedProduct.image}
                alt="image_file"
                className="w-full max-w-md mx-auto my-5"
              />
            ) : (
              <div className="m-auto text-gray-400 lg:w-full lg:max-w-xl]">
                Choose product image on local
              </div>
            )}
          </>
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
            value={product.title ?? selectedProduct.title}
            placeholder="product name"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={product.price ?? selectedProduct.price}
            placeholder="product price"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={product.category ?? selectedProduct.category}
            placeholder="product category"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="desc"
            value={product.desc ?? selectedProduct.desc}
            placeholder="product description"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="options"
            value={product.options ?? selectedProduct.options}
            placeholder="product options (comma[,] separation)"
            required
            onChange={handleChange}
          />
          <Button
            text={id ? "Edit" : "Register"}
            disabled={isUploading}
            className="h-14 mt-10"
          />
        </form>
      </div>
    </section>
  );
}
