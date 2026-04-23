import { ApiError } from '../handlers/fakeRegister';

export function isApiError(err: unknown): err is ApiError {
  return typeof err === 'object' && err !== null && 'status' in err;
}
