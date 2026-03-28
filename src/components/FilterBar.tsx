import { useTodoContext } from '../context/TodoContext';
import { FilterType } from '../types/todo.types';

type FilterOption = FilterType;

const FILTERS: FilterOption[] = ['all', 'active', 'completed'];

export const FilterBar = () => {
  const { filter, setFilter, clearCompleted } = useTodoContext();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "0.5rem 1rem",
              border: filter === f ? "2px solid #007bff" : "2px solid #ccc",
              background: filter === f ? "#007bff" : "white",
              color: filter === f ? "white" : "black",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button onClick={clearCompleted} style={{ padding: "0.5rem 1rem", background: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Clear Completed
      </button>
    </div>
  );
};
