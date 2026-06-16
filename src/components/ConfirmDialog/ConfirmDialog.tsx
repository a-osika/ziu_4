import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Usuń',
  cancelLabel = 'Anuluj',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!loading) onCancel();
      }}
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-desc'
    >
      <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirm-dialog-desc'>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant='outlined' disabled={loading} autoFocus>
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          color='error'
          variant='contained'
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color='inherit' /> : undefined}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
