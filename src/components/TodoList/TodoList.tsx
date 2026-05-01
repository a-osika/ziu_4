import { useMemo } from 'react';
import { useTodoContext } from '../../context/TodoContext';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Checkbox,
  IconButton,
  Typography,
  Paper,
  Chip,
} from '@mui/material';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

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
          <ListItem key={todo.id} disablePadding divider={idx < filteredTodos.length - 1}>
            <ListItemButton
              onClick={() => dispatch({ type: 'SELECT', payload: todo.id })}
              sx={{
                bgcolor: todo.completed ? 'action.hover' : 'background.paper',
              }}
            >
              <ListItemIcon onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
                  aria-label={`${
                    todo.completed ? 'Oznacz jako nieukończone' : 'Oznacz jako ukończone'
                  }: ${todo.title}`}
                />
              </ListItemIcon>

              <ListItemText
                primary={todo.title}
                secondary={todo.createdAt.toLocaleDateString()}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.disabled' : 'text.primary',
                }}
              />

              {todo.completed && (
                <Chip label='Ukończone' size='small' color='success' sx={{ mr: 5 }} />
              )}

              <IconButton
                edge='end'
                color='error'
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'DELETE', payload: todo.id });
                }}
                aria-label={`Usuń zadanie: ${todo.title}`}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
