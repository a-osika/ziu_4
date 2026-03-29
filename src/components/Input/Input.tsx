import './Input.css';

type InputVariant = 'default' | 'error';

export function Input({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  variant = 'default',
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: InputVariant;
}) {
  return (
    <div className={`input-group ${disabled ? 'disabled' : ''}`}>
      <label className="input-label">{label}</label>

      <input
        className={`input-field ${variant === 'error' ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
