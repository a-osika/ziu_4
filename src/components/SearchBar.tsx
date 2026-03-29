import { useTodoContext } from "../context/TodoContext";

export function SearchBar() {
  const { query, setQuery } = useTodoContext();

  return (
    <input
      className="input"
      placeholder="Szukaj zadania..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}