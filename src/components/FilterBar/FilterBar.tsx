import { useTodoContext } from '../../context/TodoContext';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export function FilterBar() {
  const { filter, setFilter } = useTodoContext();

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={(_, value) => value && setFilter(value)}
      sx={{ mb: 2 }}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="active">Active</ToggleButton>
      <ToggleButton value="completed">Completed</ToggleButton>
    </ToggleButtonGroup>
  );
}
