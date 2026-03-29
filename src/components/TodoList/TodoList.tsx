import { useTodoContext } from "../../context/TodoContext";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoList.css";

export function TodoList() {
  const { todos, filter, query } = useTodoContext();

const filteredTodos = todos
  .filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  })
  .filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}