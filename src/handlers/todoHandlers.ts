import { TodoState, Todo, PanelMode } from "../types/todo.types";

export function openCreate(state: TodoState): TodoState {
  return {
    ...state,
    selectedTodo: null,
    panelMode: "create",
  };
}

export function addTodo(state: TodoState, title: string): TodoState {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date(),
  };

  return {
    ...state,
    todos: [newTodo, ...state.todos],
  };
}

export function toggleTodo(state: TodoState, id: string): TodoState {
  return {
    ...state,
    todos: state.todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ),
  };
}

export function deleteTodo(state: TodoState, id: string): TodoState {
  return {
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
    selectedTodo:
      state.selectedTodo?.id === id ? null : state.selectedTodo,
  };
}

export function editTodo(
  state: TodoState,
  payload: { id: string; title: string }
): TodoState {
  const updatedTodos = state.todos.map((t) =>
    t.id === payload.id ? { ...t, title: payload.title } : t
  );

  return {
    ...state,
    todos: updatedTodos,
    selectedTodo:
      updatedTodos.find((t) => t.id === payload.id) || null,
  };
}

export function selectTodo(state: TodoState, id: string): TodoState {
  return {
    ...state,
    selectedTodo:
      state.todos.find((t) => t.id === id) || null,
    panelMode: "view",
  };
}

export function clearSelection(state: TodoState): TodoState {
  return {
    ...state,
    selectedTodo: null,
    panelMode: null,
  };
}

export function setMode(
  state: TodoState,
  mode: PanelMode
): TodoState {
  return {
    ...state,
    panelMode: mode,
  };
}