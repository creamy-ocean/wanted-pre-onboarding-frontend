import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="">
      <Link to="signup">
        <button className="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          회원가입
        </button>
      </Link>
      <Link to="signin">
        <button>로그인</button>
      </Link>
      <Link to="todo">
        <button>투두</button>
      </Link>
    </header>
  );
}
