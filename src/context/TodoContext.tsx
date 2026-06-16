import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type ReactNode,
} from 'react';
import { NewTodoEntry, TodoAction, TodoState } from '../types/todo.types';
import { todoReducer, initialState } from '../reducers/todoReducer';
import { todoApi } from '../services/todoApi';
import { useSnackbar } from './SnackbarContext';

type FilterType = 'all' | 'active' | 'completed';

interface TodoContextType extends TodoState {
  dispatch: Dispatch<TodoAction>;
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  query: string;
  setQuery: (q: string) => void;
  fetchTodos: () => Promise<void>;
  createTodo: (entry: NewTodoEntry) => Promise<void>;
  updateTodo: (id: string, patch: Partial<NewTodoEntry>) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');
  const { showToast } = useSnackbar();

  const fetchTodos = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const todos = await todoApi.list();
      dispatch({ type: 'SET_TODOS', payload: todos });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Nie udało się pobrać zadań' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (entry: NewTodoEntry) => {
    try {
      const todo = await todoApi.create(entry);
      dispatch({ type: 'ADD', payload: todo });
    } catch (e) {
      showToast('Nie udało się dodać zadania', 'error');
      throw e;
    }
  };

  const updateTodo = async (id: string, patch: Partial<NewTodoEntry>) => {
    try {
      const todo = await todoApi.update(id, patch);
      dispatch({ type: 'EDIT', payload: todo });
    } catch (e) {
      showToast('Nie udało się zapisać zmian', 'error');
      throw e;
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const todo = await todoApi.update(id, { completed });
      dispatch({ type: 'EDIT', payload: todo });
    } catch (e) {
      showToast('Nie udało się zmienić statusu', 'error');
      throw e;
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await todoApi.remove(id);
      dispatch({ type: 'DELETE', payload: id });
    } catch (e) {
      showToast('Nie udało się usunąć zadania', 'error');
      throw e;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        ...state,
        dispatch,
        filter,
        setFilter,
        query,
        setQuery,
        fetchTodos,
        createTodo,
        updateTodo,
        toggleTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext must be used within TodoProvider');
  return context;
}
