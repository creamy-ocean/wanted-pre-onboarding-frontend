import React, { useState } from "react";

export default function AddTodo({ onCreate }) {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      alert("추가할 투두를 입력해주세요");
    } else {
      onCreate(todo);
      setTodo("");
    }
  };

  return (
    <form>
      <input
        data-testid="new-todo-input"
        type="text"
        value={todo}
        onChange={handleChange}
      />
      <button data-testid="new-todo-add-button" onClick={handleSubmit}>
        추가
      </button>
    </form>
  );
}
