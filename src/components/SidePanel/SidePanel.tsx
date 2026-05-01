import { Drawer, Box } from '@mui/material';
import { useTodoContext } from '../../context/TodoContext';

import { ViewMode } from './ViewMode';
import { EditMode } from './EditMode';
import { CreateMode } from './CreateMode';

export function SidePanel() {
  const { selectedTodo, panelMode, dispatch } = useTodoContext();

  const isOpen = !!selectedTodo || panelMode === 'create';

  const handleClose = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  return (
    <Drawer
      anchor='right'
      open={isOpen}
      onClose={handleClose}
      role='complementary'
      aria-label='Panel szczegółów zadania'
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 420, md: 480 },
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          },
        },
      }}
    >
      <Box
        component='aside'
        sx={{ overflowY: 'auto', flex: 1 }}
      >
        {panelMode === 'create' && <CreateMode />}

        {panelMode !== 'create' && selectedTodo && (
          <>
            {panelMode === 'view' && <ViewMode />}
            {panelMode === 'edit' && <EditMode />}
          </>
        )}
      </Box>
    </Drawer>
  );
}
