export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date | null;
}

export interface TodoState {
  todos: Todo[];
  selectedTodo: Todo | null;
  panelMode: PanelMode;
}

export type PanelMode = 'view' | 'edit' | 'create' | null;

export type FilterType = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';

export type Priority = 'low' | 'medium' | 'high';

export type NewTodoEntry = Omit<Todo, 'id' | 'completed' | 'createdAt'>;

export type TodoAction =
  | { type: 'ADD'; payload: NewTodoEntry }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: Partial<NewTodoEntry> & { id: string } }
  | { type: 'OPEN_CREATE' }
  | { type: 'SELECT'; payload: string }
  | { type: 'SET_MODE'; payload: PanelMode }
  | { type: 'CLEAR_SELECTION' };
