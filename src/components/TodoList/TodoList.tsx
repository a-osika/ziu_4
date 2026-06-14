import { useMemo } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { List, Typography, Paper } from '@mui/material';

export function TodoList() {
  const { todos, filter, query, dispatch } = useTodoContext();

  const filteredTodos = useMemo(() => {
    return todos
      .filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, filter, query]);

  if (filteredTodos.length === 0) {
    return (
      <Typography
        component='article'
        role='status'
        aria-live='polite'
        color='text.secondary'
        sx={{ mt: 4, textAlign: 'center' }}
      >
        Brak zadań. Dodaj pierwsze!
      </Typography>
    );
  }

  return (
    <Paper variant='outlined' component='article' sx={{ overflow: 'hidden' }}>
      <List disablePadding aria-label='Lista zadań'>
        {filteredTodos.map((todo, idx) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isLast={idx === filteredTodos.length - 1}
            onSelect={(id) => dispatch({ type: 'SELECT', payload: id })}
            onToggle={(id) => dispatch({ type: 'TOGGLE', payload: id })}
            onDelete={(id) => dispatch({ type: 'DELETE', payload: id })}
          />
        ))}
      </List>
    </Paper>
  );
}
