import React from "react";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineEmojiNature } from "react-icons/md";
import { googleLogin, googleLogout } from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";

export default function Header() {
  const { user } = useAuthContext();

  return (
    <header className="sub-wrap flex justify-between">
      <Link
        to="/"
        className="flex bg-clip-text text-transparent bg-gradient-to-r from-green to-beige font-bold text-4xl italic"
      >
        AgneShop
        <MdOutlineEmojiNature className="text-brown-light" />
      </Link>
      <nav className="flex gap-8 items-center text-lg font-semibold">
        <Link to="/shop">Shop</Link>
        {user && (
          <>
            <Link to="/carts">
              <CartStatus />
            </Link>
            <User user={user} />
          </>
        )}
        {user && user.isAdmin && (
          <Link to="/shop/product/add">
            <BsPencilSquare className="text-2xl text-green" />
          </Link>
        )}
        {!user ? (
          <Button text="Login" onClick={googleLogin} />
        ) : (
          <Button text="Logout" onClick={googleLogout} />
        )}
      </nav>
    </header>
  );
}
