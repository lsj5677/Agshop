import React from "react";
import { Link } from "react-router-dom";

export default function User({ user }) {
  const { displayName, photoURL } = user;
  return (
    <Link to="/mypage" className="flex items-center gap-2 shrink-0">
      <img
        src={photoURL}
        alt={displayName}
        className="w-10 h-10 rounded-full"
      />
      <span className="hidden md:block">{displayName}</span>
    </Link>
  );
}
