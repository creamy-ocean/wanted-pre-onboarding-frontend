import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="signup">
        <button>회원가입</button>
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
