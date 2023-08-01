import { useState } from "react";

export default function TodoCard({ todoItem, onUpdate, onDelete }) {
  const { id, todo, isCompleted } = todoItem;
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(todo);

  const handleCheckbox = () => {
    onUpdate({ ...todoItem, isCompleted: !isCompleted });
  };

  const handleEditMode = () => {
    setText(todo);
    setIsEditMode((prev) => !prev);
  };

  const handleText = (e) => setText(e.target.value);

  const handleUpdate = () => {
    onUpdate({ id, todo: text, isCompleted });
    setIsEditMode(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li key={id} className="flex px-2 pt-2 justify-between">
      <label className="flexbox">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckbox}
          className="h-4 w-4 mr-2 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
        />
        {!isEditMode && <span className="text-sm">{todo}</span>}
      </label>
      <div>
        {isEditMode ? (
          <>
            <input
              data-testid="modify-input"
              value={text}
              onChange={handleText}
              className="rounded-md border-0 px-2 py-1 mr-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            <button
              data-testid="submit-button"
              onClick={handleUpdate}
              className="rounded-md bg-gray-100 px-2 py-1 ml-1 text-sm text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={handleEditMode}
              className="rounded-md bg-gray-100 px-2 py-1 ml-1 text-sm text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              data-testid="modify-button"
              onClick={handleEditMode}
              className="rounded-md bg-gray-100 px-2 py-1 ml-1 text-sm text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={handleDelete}
              className="rounded-md bg-gray-100 px-2 py-1 ml-1 text-sm text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}
