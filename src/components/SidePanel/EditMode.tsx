import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";

export function EditMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  const [title, setTitle] = useState(selectedTodo!.title);

  const handleSave = () => {
    dispatch({
      type: "EDIT",
      payload: { id: selectedTodo!.id, title },
    });

    dispatch({ type: "SET_MODE", payload: "edit" });
  };

  return (
    <>
      <div className="details-panel__header">
        <h2 className="h2">Edycja</h2>
      </div>
      <div className="details-panel__body">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="details-panel__actions">
          <button onClick={handleSave} className="btn-primary">
            Zapisz
          </button>

          <button
            onClick={() => dispatch({ type: "SET_MODE", payload: "view" })}
          >
            Anuluj
          </button>
        </div>
      </div>
    </>
  );
}
