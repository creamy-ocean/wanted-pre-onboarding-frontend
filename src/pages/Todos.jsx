import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../service/todo";
import TodoCard from "./TodoCard";
import Alert from "../components/Alert";
import AddTodo from "./AddTodo";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const setErrorMsg = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const getTodoList = () => {
    getTodos(token)
      .then((response) => {
        setTodos(response.data);
      })
      .catch(setErrorMsg);
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      getTodoList();
    }
    // eslint-disable-next-line
  }, [token]);

  const onCreate = (todo) => {
    createTodo(token, todo)
      .then((response) => {
        setTodos((prev) => [...prev, response.data]);
      })
      .catch(setErrorMsg);
  };

  const onUpdate = (todoItem) => {
    updateTodo(token, todoItem)
      .then(() => {
        getTodoList();
      })
      .catch(setErrorMsg);
  };

  const onDelete = (id) => {
    deleteTodo(token, id)
      .then(() => {
        getTodoList();
      })
      .catch(setErrorMsg);
  };

  return (
    <div>
      <AddTodo onCreate={onCreate} />
      {error && <Alert msg={error}></Alert>}
      <ul>
        {todos &&
          todos.map((item) => {
            return (
              <TodoCard
                key={item.id}
                todoItem={item}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            );
          })}
      </ul>
    </div>
  );
}
