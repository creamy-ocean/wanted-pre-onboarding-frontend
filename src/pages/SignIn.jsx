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
    <div>
      <form>
        <input
          data-testid="email-input"
          type="email"
          required
          onChange={handleEmail}
        />
        <input
          data-testid="password-input"
          type="password"
          required
          onChange={handlePassword}
        />
        <button
          disabled={!(isEmailValid && isPasswordValid)}
          data-testid="signin-button"
          onClick={onSubmit}
        >
          로그인
        </button>
        {error && <Alert msg={error}></Alert>}
      </form>
    </div>
  );
}