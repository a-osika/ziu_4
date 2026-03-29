export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  selectedTodo: Todo | null;
  panelMode: PanelMode;
}

export type PanelMode = 'view' | 'edit' | 'create' | null;

export type FilterType = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';

export type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; title: string } }
  | { type: 'OPEN_CREATE' }
  | { type: 'SELECT'; payload: string }
  | { type: 'SET_MODE'; payload: PanelMode }
  | { type: 'CLEAR_SELECTION' };
