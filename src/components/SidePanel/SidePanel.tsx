import { useTodoContext } from "../../context/TodoContext";
import { ViewMode } from "./ViewMode";
import { EditMode } from "./EditMode";
import { CreateMode } from "./CreateMode";
import "./SidePanel.css";

export function SidePanel() {
  const { selectedTodo, panelMode, dispatch } = useTodoContext();

  if (!selectedTodo && panelMode !== "create") return null;

  return (
    <>
      <div
        className="details-overlay open"
        onClick={() => dispatch({ type: "CLEAR_SELECTION" })}
      />

      <aside className="details-panel open">
        <div className="details-panel__content">

          {panelMode === "create" && <CreateMode />}

          {panelMode !== "create" && selectedTodo && (
            <>
              {panelMode === "view" && <ViewMode />}
              {panelMode === "edit" && <EditMode />}
            </>
          )}
        </div>
      </aside>
    </>
  );
}