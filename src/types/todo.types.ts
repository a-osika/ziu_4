export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export type FilterType = "all" | "active" | "completed";

export type Theme = 'light' | 'dark';

export type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: string }
  | { type: "DELETE"; payload: string }
  | { type: "EDIT"; payload: { id: string; title: string } };

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, description?: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  theme: Theme;
  toggleTheme: () => void;
}
