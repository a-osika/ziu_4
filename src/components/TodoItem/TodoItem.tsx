import { useTodoContext } from "../../context/TodoContext";
import { Todo } from "../../types/todo.types";
import { Icon } from "../Icon/Icon";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { dispatch } = useTodoContext();

  const handleToggle = () => dispatch({ type: "TOGGLE", payload: todo.id });
  const handleDelete = () => dispatch({ type: "DELETE", payload: todo.id });

  return (
    <li
      onClick={() =>
        dispatch({ type: "SELECT", payload: todo.id })
      }
      className={`todo-item ${todo.completed ? "todo-item--completed" : ""}`}>
      <div className="todo-item__row">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          className="todo-item__checkbox"
        />

        <div className="todo-item__content">
          <span className="todo-item__title h3">{todo.title}</span>
          <span className="todo-item__date body2">
            {todo.createdAt.toLocaleString()}
          </span>
        </div>

        <button className="todo-item__delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}>
          <Icon name="trash" />
        </button>
      </div>
    </li>
  );
}