import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import { Icon } from "../Icon/Icon";
import  "./FilterBar.css";

const FILTERS: ("all" | "active" | "completed")[] = [
  "all",
  "active",
  "completed",
];

export function FilterBar() {
  const { filter, setFilter } = useTodoContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="filter-bar">
      <div
        className="filter-bar__header"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="h5">Filtry</span>
        <Icon
          name="filter"
          className={`icon-rotatable ${open ? "open" : ""}`}
        />
      </div>

      {open && (
        <div   className={`filter-bar__content ${open ? "open" : ""}`}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-bar__button ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
