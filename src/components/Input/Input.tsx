import { TextField } from '@mui/material';

type InputVariant = 'default' | 'error';

export function Input({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  variant = 'default',
}: {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: InputVariant;
}) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      error={variant === 'error'}
      variant='outlined'
    />
  );
}
