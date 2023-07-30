import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../service/todo";
import TodoCard from "./TodoCard";
import Alert from "../components/Alert";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      getTodos(token)
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          setError(error);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setTodo(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(token, todo)
      .then((response) => {
        setTodos((prev) => {
          const newTodos = [...prev, response.data];
          return newTodos;
        });
      })
      .catch((error) => {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  const onUpdate = (todoItem) => {
    updateTodo(token, todoItem)
      .then(() => {
        getTodos(token)
          .then((response) => {
            setTodos(response.data);
          })
          .catch((error) => {
            setError(error);
            setTimeout(() => {
              setError("");
            }, 5000);
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  const onDelete = (id) => {
    deleteTodo(token, id)
      .then(() => {
        getTodos(token)
          .then((response) => {
            setTodos(response.data);
          })
          .catch((error) => {
            setError(error);
            setTimeout(() => {
              setError("");
            }, 5000);
          });
      })
      .catch((error) => {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <div>
      <form>
        <input
          data-testid="new-todo-input"
          type="text"
          onChange={handleChange}
        />
        <button data-testid="new-todo-add-button" onClick={handleSubmit}>
          추가
        </button>
      </form>
      {error && <Alert msg={error}></Alert>}
      <ul>
        {todos.length > 1 &&
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
