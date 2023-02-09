import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineEmojiNature } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { googleLogin, googleLogout } from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuthContext();
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    googleLogin();
    setMobile(false);
  };

  const handleLogout = () => {
    googleLogout();
    setMobile(false);
    navigate("/");
  };

  return (
    <header className="sub-wrap flex justify-between">
      <Link
        to="/"
        className="flex bg-clip-text text-transparent bg-gradient-to-r from-green to-beige font-bold text-2xl sm:text-4xl italic"
      >
        AgneShop
        <MdOutlineEmojiNature className="text-brown-light" />
      </Link>
      <nav
        className={`${
          mobile
            ? "right-0 transition-all ease-in-out duration-300 z-10"
            : "right-full transition-all ease-in-out duration-300"
        } fixed top-0 z-20 w-screen h-screen pt-40 bg-white flex flex-col gap-8 items-center text-lg font-semibold md:static md:w-auto md:h-auto md:bg-transparent md:right-0 md:flex-row md:pt-0`}
      >
        <Link to="/" onClick={() => setMobile(false)}>
          About
        </Link>
        <Link to="/shop" onClick={() => setMobile(false)}>
          Shop
        </Link>
        {user && (
          <a href="/carts">
            <CartStatus />
          </a>
        )}
        <div className="mt-10 flex gap-8 pt-10 md:gap-4 md:mt-0 md:border-0 md:pt-0">
          {user && <User user={user} />}
          {user && user.isAdmin && (
            <Link to="/shop/product/add">
              <BsPencilSquare className="text-2xl text-green" />
            </Link>
          )}
          {!user ? (
            <Button text="Login" onClick={handleLogin} />
          ) : (
            <Button text="Logout" onClick={handleLogout} />
          )}
        </div>
      </nav>
      <button
        className="fixed z-30 top-7 right-7 text-3xl bg-beige p-2 rounded-full md:hidden"
        onClick={() => setMobile(!mobile)}
      >
        {mobile ? <IoCloseOutline className="text-4xl" /> : <RxHamburgerMenu />}
      </button>
    </header>
  );
}
