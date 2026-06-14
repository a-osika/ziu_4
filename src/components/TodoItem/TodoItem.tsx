import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Todo } from '../../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  isLast: boolean;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: { label: 'Niski', color: 'info' as const },
  medium: { label: 'Średni', color: 'warning' as const },
  high: { label: 'Wysoki', color: 'error' as const },
};

export function TodoItem({ todo, isLast, onSelect, onToggle, onDelete }: TodoItemProps) {
  const currentPriority = priorityConfig[todo.priority] || priorityConfig.medium;

  const formattedDate = new Date(todo.createdAt).toLocaleDateString();
  const formattedDueDate = todo.dueDate
    ? ` | Termin: ${new Date(todo.dueDate).toLocaleDateString()}`
    : '';
  const secondaryText = `${formattedDate}${formattedDueDate}`;

  return (
    <ListItem disablePadding divider={!isLast}>
      <ListItemButton
        onClick={() => onSelect(todo.id)}
        onKeyDown={(e) => {
          if (e.key === 'Delete') onDelete(todo.id);
        }}
        sx={{
          bgcolor: todo.completed ? 'action.hover' : 'background.paper',
          gap: 1,
        }}
      >
        <ListItemIcon onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            slotProps={{
              input: {
                'aria-label': `${todo.completed ? 'Oznacz jako nieukończone' : 'Oznacz jako ukończone'}: ${todo.title}`,
              },
            }}
          />
        </ListItemIcon>

        <ListItemText
          primary={todo.title}
          secondary={secondaryText}
          sx={{ minWidth: 0, flex: 1 }}
          slotProps={{
            primary: {
              sx: {
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.disabled' : 'text.primary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            },
            secondary: {
              sx: {
                color: todo.completed ? 'text.disabled' : 'text.secondary',
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          {todo.completed ? (
            <Chip label='Ukończone' size='small' color='success' />
          ) : (
            <Chip
              label={currentPriority.label}
              size='small'
              color={currentPriority.color}
              variant='outlined'
            />
          )}
          <IconButton
            color='error'
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
            aria-label={`Usuń zadanie: ${todo.title}`}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}
