import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-100 h-24 flex justify-center items-center">
      <Link to="signup">
        <button className="btn">회원가입</button>
      </Link>
      <Link to="signin">
        <button className="btn ml-2">로그인</button>
      </Link>
      <Link to="todo">
        <button className="btn ml-2">투두</button>
      </Link>
    </header>
  );
}
