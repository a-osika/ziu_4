import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import { Icon } from "../Icon/Icon";
import "./FilterBar.css";

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
        <div className={`filter-bar__content ${open ? "open" : ""}`}>
          {FILTERS.map((filterValue) => (
            <button
              key={filterValue}
              onClick={() => setFilter(filterValue)}
              className={`btn filter-bar__button ${filter === filterValue ? "active" : ""}`}
            >
              {filterValue}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
