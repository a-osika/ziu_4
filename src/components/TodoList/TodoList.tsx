import { useMemo } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { List, Typography, Paper } from '@mui/material';

export function TodoList() {
  const { todos, filter, query, dispatch } = useTodoContext();
  const { showToast } = useSnackbar();

  const filteredTodos = useMemo(() => {
    return todos
      .filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, filter, query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const buttons = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('.MuiListItemButton-root')
    );
    const active = document.activeElement as HTMLElement;
    let idx = buttons.indexOf(active);
    if (idx === -1) {
      idx = buttons.findIndex((btn) => btn.contains(active));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      buttons[idx + 1]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      buttons[idx - 1]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttons[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttons[buttons.length - 1]?.focus();
    }
  };

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
      <List disablePadding aria-label='Lista zadań' onKeyDown={handleKeyDown}>
        {filteredTodos.map((todo, idx) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isLast={idx === filteredTodos.length - 1}
            onSelect={(id) => dispatch({ type: 'SELECT', payload: id })}
            onToggle={(id) => dispatch({ type: 'TOGGLE', payload: id })}
            onDelete={(id) => {
              dispatch({ type: 'DELETE', payload: id });
              showToast('Zadanie zostało usunięte', 'info');
            }}
          />
        ))}
      </List>
    </Paper>
  );
}
