import { useState } from "react";

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
      <div className="flexbox">
        <input
          data-testid="new-todo-input"
          type="text"
          value={todo}
          placeholder="투두를 입력해주세요"
          onChange={handleChange}
          className="w-60 rounded-md border-0 px-2 py-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
        />
        <button
          data-testid="new-todo-add-button"
          onClick={handleSubmit}
          className="rounded-md ml-2 bg-gray-100 px-2 py-1.5 text-sm text-gray-600 ring-1 ring-inset ring-gray-500/10"
        >
          추가
        </button>
      </div>
    </form>
  );
}
