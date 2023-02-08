import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogin } from "../api/firebase";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContext";
import useCarts from "../hooks/useCarts";
import useProducts from "../hooks/useProducts";

export default function ProductDetail() {
  const {
    state: {
      product: { id, image, title, desc, options, category, price },
    },
  } = useLocation();

  const productDetailData = {
    id,
    image,
    title,
    desc,
    options,
    category,
    price,
  };

  const { user } = useAuthContext();
  const [success, setSuccess] = useState();
  const { addOrUpdateItem } = useCarts();
  const { removedProduct } = useProducts();
  const [selected, setSelected] = useState(options && options[0]);
  const navigate = useNavigate();

  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = () => {
    const product = { id, image, title, price, option: selected, quantity: 1 };

    if (!user) {
      googleLogin();
      return;
    }
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("Added to Cart!");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };

  const handleDelete = () => {
    const productId = { id };

    console.debug(`SUJIN:: ~ handleDelete ~ productId`, productId);
    if (window.confirm("Are you sure you want to delete?")) {
      removedProduct.mutate(productId, {
        onSuccess: () => {
          alert("Success.");
          navigate("/shop");
        },
      });
    }
  };

  return (
    <>
      {user && user.isAdmin && (
        <div className="sub-wrap flex gap-3 justify-end">
          <Button
            text="Edit"
            className="bg-beige py-1 px-4 rounded hover:bg-brown-light active:bg-brown-dark active:text-beige"
            onClick={() => {
              navigate(`/shop/product/edit/${id}`, {
                state: { productDetailData },
              });
            }}
          />
          <Link to={`/shop/product/update/${id}`}>Edit</Link>
          <Button text="delete" onClick={handleDelete} />
          {success && (
            <p className="absolute top-5 left-1/2 -traslate-x-1/2 bg-green text-white p-3 rounded-md text-xl">
              {success}
            </p>
          )}
        </div>
      )}
      <section className="relative sub-wrap md:flex sm:gap-20 md:gap-20 xl:gap-40">
        <div className="product-image md:max-w-2xl">
          <img src={image} alt={title} />
        </div>
        <div className="product-info font-serif pt-20">
          <ul className="md:flex items-center justify-between">
            <li className="font-bold text-4xl md:text-3xl lg:text-5xl">
              {title}
            </li>
            <li className="text-lg mt-3 md:mt-0 whitespace-nowrap">
              CAD {price}.00 CAD
            </li>
          </ul>
          <span className="inline-block mt-2 text-sm px-2 rounded-lg bg-beige text-brown-light">
            {category}
          </span>
          <p className="my-10">
            {desc} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Veniam, delectus accusantium nostrum deleniti amet ea. Architecto
            sint aliquam perspiciatis non fugiat molestiae laboriosam dolores.
            Quidem illum asperiores quos ea voluptatem?
          </p>
          <div>
            <select
              className="w-full border rounded-md p-3"
              onChange={handleSelect}
            >
              {options.map((option, id) => (
                <option key={id}>{option}</option>
              ))}
            </select>
            {success && (
              <p className="absolute top-5 left-1/2 -traslate-x-1/2 bg-green text-white p-3 rounded-md text-xl">
                {success}
              </p>
            )}
            <Button
              text="Add Cart"
              className="block w-full py-3 mt-10"
              onClick={handleClick}
            />
          </div>
        </div>
      </section>
    </>
  );
}
