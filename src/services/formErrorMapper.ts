import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ApiError } from '../handlers/fakeRegister';

export function mapApiError<T extends FieldValues>(err: ApiError, form: UseFormReturn<T>) {
  if (err.field && err.field !== 'root') {
    form.setError(err.field as any, {
      type: 'server',
      message: err.message,
    });
    return;
  }

  form.setError('root.serverError' as any, {
    type: 'server',
    message: err.message,
  });
}
