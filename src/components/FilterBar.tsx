import { useTodoContext } from "../context/TodoContext";
import { useTheme } from "../context/ThemeContext";

const FILTERS: ("all" | "active" | "completed")[] = ["all", "active", "completed"];

export function FilterBar() {
  const { filter, setFilter } = useTodoContext();
  const { theme } = useTheme();

  const buttonStyle = (active: boolean) => ({
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: active
      ? `2px solid ${theme === "light" ? "#007bff" : "#00d4ff"}`
      : "2px solid #ccc",
    background: active
      ? theme === "light"
        ? "#007bff"
        : "#00d4ff"
      : theme === "light"
      ? "white"
      : "#333",
    color: active
      ? "white"
      : theme === "light"
      ? "black"
      : "white",
    cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={buttonStyle(filter === f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}