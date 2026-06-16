import { TodoState, Todo, PanelMode } from '../types/todo.types';

export function openCreate(state: TodoState): TodoState {
  return {
    ...state,
    selectedTodo: null,
    panelMode: 'create',
  };
}

export function addTodo(state: TodoState, todo: Todo): TodoState {
  return { ...state, todos: [todo, ...state.todos] };
}

export function toggleTodo(state: TodoState, id: string): TodoState {
  return {
    ...state,
    todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
  };
}

export function deleteTodo(state: TodoState, id: string): TodoState {
  return {
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
    selectedTodo: state.selectedTodo?.id === id ? null : state.selectedTodo,
  };
}

export function editTodo(state: TodoState, payload: Partial<Todo> & { id: string }): TodoState {
  const updatedTodos = state.todos.map((t) => (t.id === payload.id ? { ...t, ...payload } : t));

  return {
    ...state,
    todos: updatedTodos,
    selectedTodo:
      state.selectedTodo?.id === payload.id
        ? (updatedTodos.find((t) => t.id === payload.id) ?? null)
        : state.selectedTodo,
  };
}

export function selectTodo(state: TodoState, id: string): TodoState {
  return {
    ...state,
    selectedTodo: state.todos.find((t) => t.id === id) || null,
    panelMode: 'view',
  };
}

export function clearSelection(state: TodoState): TodoState {
  return {
    ...state,
    selectedTodo: null,
    panelMode: null,
  };
}

export function setMode(state: TodoState, mode: PanelMode): TodoState {
  return {
    ...state,
    panelMode: mode,
  };
}
