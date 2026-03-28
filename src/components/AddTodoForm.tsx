import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

export const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, description || undefined);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          What needs to be done?
        </label>
        <input
          type="text"
          placeholder="Enter your task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Description (optional)
        </label>
        <input
          type="text"
          placeholder="Add more details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>
      <button type="submit" style={{ padding: "0.5rem 1rem", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Add Task
      </button>
    </form>
  );
};
