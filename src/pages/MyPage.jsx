import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function MyPage() {
  const { user } = useAuthContext();
  console.debug(`SUJIN:: ~ MyPage ~ user`, user);
  return <div>Mypage</div>;
}
