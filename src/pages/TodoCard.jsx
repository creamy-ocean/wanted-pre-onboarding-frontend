import React, { useState } from "react";

export default function TodoCard({ todoItem, onUpdate, onDelete }) {
  const { id, todo, isCompleted } = todoItem;
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(todo);

  const handleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <li key={id}>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            onUpdate({ ...todoItem, isCompleted: !isCompleted });
          }}
        />
        {!isEditMode && <span>{todo}</span>}
      </label>
      {isEditMode ? (
        <>
          <input
            data-testid="modify-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            data-testid="submit-button"
            onClick={() => {
              onUpdate({ id, todo: text, isCompleted });
              setIsEditMode(false);
            }}
          >
            제출
          </button>
          <button data-testid="cancel-button" onClick={handleEditMode}>
            취소
          </button>
        </>
      ) : (
        <>
          <button data-testid="modify-button" onClick={handleEditMode}>
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() => {
              onDelete(id);
            }}
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
}
