import { useTodoContext } from "../../context/TodoContext";
import { Input } from "../Input/Input";

export function ViewMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  return (
    <>
      <div className="details-panel__header">
        <h2 className="h2">Szczegóły</h2>
      </div>
      <div className="details-panel__body">
        <Input
          label="Tytuł"
          value={selectedTodo!.title}
          onChange={() => {}}
          disabled
        />

        <div className="body2">Dodano: {selectedTodo!.createdAt.toLocaleDateString()}</div>

        <div className="details-panel__actions">
          <button
            className="btn btn-ghost"
            onClick={() => dispatch({ type: "CLEAR_SELECTION" })}
          >
            Zamknij
          </button>

          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "SET_MODE", payload: "edit" })}
          >
            Edytuj
          </button>
        </div>
      </div>
    </>
  );
}
