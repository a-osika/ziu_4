import { TodoState, TodoAction } from '../types/todo.types';

import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  selectTodo,
  clearSelection,
  setMode,
  openCreate,
} from '../handlers/todoHandlers';

export const initialState: TodoState = {
  todos: [
      {
        id: '1',
        title: 'Skończone zadanie',
        completed: true,
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Nieskończone zadanie',
        completed: false,
        createdAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    ],
  selectedTodo: null,
  panelMode: null,
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'OPEN_CREATE':
      return openCreate(state);
    case 'ADD':
      return addTodo(state, action.payload);

    case 'TOGGLE':
      return toggleTodo(state, action.payload);

    case 'DELETE':
      return deleteTodo(state, action.payload);

    case 'EDIT':
      return editTodo(state, action.payload);

    case 'SELECT':
      return selectTodo(state, action.payload);

    case 'SET_MODE':
      return setMode(state, action.payload);

    case 'CLEAR_SELECTION':
      return clearSelection(state);

    default:
      return state;
  }
}
