import { useTodoContext } from "../../context/TodoContext";

export function ViewMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  return (
    <>
      <div className="details-panel__header">
        <h2 className="h2">Szczegóły</h2>
      </div>
      <div className="details-panel__body">
        <h3 className="h3">{selectedTodo!.title}</h3>

        <p className="body2">{selectedTodo!.createdAt.toLocaleString()}</p>

        <button
          className="btn-primary"
          onClick={() => dispatch({ type: "SET_MODE", payload: "edit" })}
        >
          Edytuj
        </button>
      </div>
    </>
  );
}
