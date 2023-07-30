import { axiosClient } from "../util/axiosClient";

export function getTodos(token) {
  return axiosClient.get("todos", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function createTodo(token, todo) {
  return axiosClient.post(
    "todos",
    { todo },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function updateTodo(token, todoItem) {
  const { id, todo, isCompleted } = todoItem;
  return axiosClient.put(
    `todos/${id}`,
    {
      todo,
      isCompleted,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function deleteTodo(token, id) {
  return axiosClient.delete(`todos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
