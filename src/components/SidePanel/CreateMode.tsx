import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";

export function CreateMode() {
  const { dispatch, setFilter, setQuery } = useTodoContext();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    dispatch({ type: "ADD", payload: title });

    setFilter("all");
    setQuery("");

    dispatch({ type: "CLEAR_SELECTION" });
  };

  return (
    <>
      <div className="details-panel__header">
        <h2 className="h2">Nowe zadanie</h2>
      </div>

      <div className="details-panel__body">
        <input
          className="input"
          placeholder="Nazwa zadania..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="btn-primary" onClick={handleAdd}>
          Dodaj
        </button>
      </div>
    </>
  );
}
