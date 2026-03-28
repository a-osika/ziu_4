import { createContext, useContext, useCallback, useMemo } from 'react';
import { Todo, FilterType, TodoContextType, Theme } from '../types/todo.types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import React from 'react';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useLocalStorage<FilterType>('todoFilter', 'all');
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addTodo = useCallback((title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, [setTodos]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, [setTodos]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  const value = useMemo<TodoContextType>(
    () => ({
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      clearCompleted,
      filter,
      setFilter,
      theme,
      toggleTheme,
    }),
    [todos, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted, filter, setFilter, theme, toggleTheme]
  );

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
