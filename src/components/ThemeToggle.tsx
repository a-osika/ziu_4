import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="btn"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Use {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}