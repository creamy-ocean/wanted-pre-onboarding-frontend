import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../service/auth";
import Alert from "../components/Alert";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
    // eslint-disable-next-line
  }, []);

  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (value.includes("@")) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value.length >= 8) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/todo");
      })
      .catch((error) => {
        console.log(error);
        setError(
          error.response.data.message
            ? error.response.data.message
            : "에러가 발생했습니다"
        );
      });
  };

  return (
    <form>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <label htmlFor="email">이메일</label>
          <input
            data-testid="email-input"
            type="email"
            id="email"
            required
            onChange={handleEmail}
            className="input"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <label htmlFor="password">비밀번호</label>
          <input
            data-testid="password-input"
            type="password"
            id="password"
            required
            onChange={handlePassword}
            className="input"
          />
        </div>
        <div className="flexbox">
          <button
            disabled={!(isEmailValid && isPasswordValid)}
            data-testid="signin-button"
            onClick={onSubmit}
            className="btn mt-4"
          >
            로그인
          </button>
        </div>
        {error && <Alert msg={error}></Alert>}
      </div>
    </form>
  );
}
