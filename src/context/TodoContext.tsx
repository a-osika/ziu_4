import { createContext, useContext, ReactNode, useReducer } from "react";
import { TodoAction, TodoState } from "../types/todo.types";
import { todoReducer, initialState } from "../reducers/todoReducer";
import React from "react";

interface TodoContextType extends TodoState {
  dispatch: React.Dispatch<TodoAction>;
  filter: "all" | "active" | "completed";
  setFilter: (f: "all" | "active" | "completed") => void;
  query: string;
  setQuery: (q: string) => void;
}
const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const [filter, setFilter] = React.useState<
    "all" | "active" | "completed"
  >("all");

  const [query, setQuery] = React.useState("");

  return (
    <TodoContext.Provider
      value={{
        ...state,
        dispatch,
        filter,
        setFilter,
        query,
        setQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodoContext must be used within TodoProvider");
  return context;
}