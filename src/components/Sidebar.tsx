import { ThemeToggle } from "./ThemeToggle";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="h3">Menu</h3>
      <p className="body2">Nawigacja</p>
      <ThemeToggle />
    </aside>
  );
}
