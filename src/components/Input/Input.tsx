import { TextField } from '@mui/material';

type InputVariant = 'default' | 'error';

export function Input({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  variant = 'default',
  required = false,
}: {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: InputVariant;
  required?: boolean;
}) {
  return (
    <TextField
      fullWidth
      required={required}
      aria-required={required}
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
