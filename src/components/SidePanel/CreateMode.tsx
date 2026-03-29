import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import { Input } from "../Input/Input";

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <div className="details-panel__body">
          <Input
            label="Tytuł"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Np. Zakupy"
          />

          <div className="details-panel__actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => dispatch({ type: "CLEAR_SELECTION" })}
            >
              Anuluj
            </button>

            <button type="submit" className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
