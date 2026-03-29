import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import { Input } from "../Input/Input";

export function EditMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  const [title, setTitle] = useState(selectedTodo!.title);

  const handleSave = () => {
    dispatch({
      type: "EDIT",
      payload: { id: selectedTodo!.id, title },
    });

    dispatch({ type: "SET_MODE", payload: "view" });
  };

  return (
    <>
      <div className="details-panel__header">
        <h2 className="h2">Edycja</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="details-panel__body">
          <Input
            label="Tytuł"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wpisz tekst..."
          />

          <div className="details-panel__actions">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_MODE", payload: "view" })}
              className="btn btn-ghost"
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
