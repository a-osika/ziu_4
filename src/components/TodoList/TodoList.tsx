import { useMemo, useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { List, Typography, Paper, Box, Alert, Button } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { Todo } from '../../types/todo.types';
import { TodoListSkeleton } from './TodoListSkeleton';

export function TodoList() {
  const { todos, filter, query, loading, error, fetchTodos, toggleTodo, removeTodo, dispatch } =
    useTodoContext();
  const { showToast } = useSnackbar();

  const [confirmOpen, setDialogOpen] = useState(false);
  const [pending, setPending] = useState<Todo | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredTodos = useMemo(() => {
    return todos
      .filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  }, [todos, filter, query]);

  const requestDelete = (id: string) => {
    setPending(todos.find((t) => t.id === id) ?? null);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pending) return;
    setDeleting(true);
    try {
      await removeTodo(pending.id);
      showToast('Zadanie zostało usunięte', 'info');
      setDialogOpen(false);
    } catch {
    } finally {
      setDeleting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const buttons = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('.MuiListItemButton-root')
    );
    const active = document.activeElement as HTMLElement;
    let idx = buttons.indexOf(active);
    if (idx === -1) idx = buttons.findIndex((btn) => btn.contains(active));
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

  if (loading) {
    return (
      <>
        <Box component='span' role='status' aria-live='polite' sx={visuallyHidden}>
          Ładowanie zadań…
        </Box>
        <TodoListSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <Alert
        severity='error'
        sx={{ mt: 4 }}
        action={
          <Button color='inherit' size='small' onClick={fetchTodos}>
            Ponów
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <Typography
        component='p'
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
    <>
      <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
        <List disablePadding aria-label='Lista zadań' onKeyDown={handleKeyDown}>
          {filteredTodos.map((todo, idx) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isLast={idx === filteredTodos.length - 1}
              onSelect={(id) => dispatch({ type: 'SELECT', payload: id })}
              onToggle={(id) => {
                void toggleTodo(id, !todo.completed).catch(() => {});
              }}
              onDelete={requestDelete}
            />
          ))}
        </List>
      </Paper>
      <ConfirmDialog
        open={confirmOpen}
        loading={deleting}
        title='Usunąć zadanie?'
        message={
          pending
            ? `Czy na pewno chcesz usunąć „${pending.title}"? Tej operacji nie można cofnąć.`
            : ''
        }
        onCancel={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
