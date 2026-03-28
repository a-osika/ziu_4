import { Todo } from '../types/todo.types';
import { useTodoContext } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, deleteTodo } = useTodoContext();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div style={{
      padding: "1rem",
      borderBottom: "1px solid #ccc",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      opacity: todo.completed ? 0.6 : 1,
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        style={{ width: "20px", height: "20px" }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.1rem" }}>{todo.title}</h3>
        {todo.description && (
          <p style={{ margin: "0 0 0.5rem 0", color: "#6c757d", fontSize: "0.9rem" }}>{todo.description}</p>
        )}
        <small style={{ color: "#adb5bd" }}>
          Created: {new Date(todo.createdAt).toLocaleDateString()}
        </small>
      </div>
      <button onClick={handleDelete} style={{ padding: "0.25rem 0.5rem", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Delete
      </button>
    </div>
  );
};
