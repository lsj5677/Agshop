import React from "react";

export default function User({ user }) {
  const { displayName, photoURL } = user;
  return (
    <a href="/" className="flex items-center gap-2 shrink-0">
      <img
        src={photoURL}
        alt={displayName}
        className="w-10 h-10 rounded-full"
      />
      <span>{displayName}</span>
    </a>
  );
}
