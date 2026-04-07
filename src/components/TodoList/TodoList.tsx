import { useMemo } from 'react';
import { useTodoContext } from '../../context/TodoContext';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
      <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
        Brak zadań. Dodaj pierwsze!
      </Typography>
    );
  }

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <List disablePadding>
        {filteredTodos.map((todo, idx) => (
          <ListItem
            key={todo.id}
            divider={idx < filteredTodos.length - 1}
            onClick={() => dispatch({ type: 'SELECT', payload: todo.id })}
            sx={{
              cursor: 'pointer',
              bgcolor: todo.completed ? 'action.hover' : 'background.paper',
            }}
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'DELETE', payload: todo.id });
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            }
          >
            <ListItemIcon onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
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
              <Chip label="Ukończone" size="small" color="success" sx={{ mr: 5 }} />
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
