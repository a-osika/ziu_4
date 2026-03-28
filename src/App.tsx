import { TodoProvider } from "./context/TodoContext";
import { AddTodoForm } from "./components/AddTodoForm";
import { FilterBar } from "./components/FilterBar";
import { TodoList } from "./components/TodoList";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <TodoProvider>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>✨ Todo App</h1>
          <p>Stay organized and get things done</p>
        </header>

        <AddTodoForm />
        <FilterBar />
        <TodoList />
      </div>
    </TodoProvider>
  );
}