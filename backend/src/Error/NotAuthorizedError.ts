import { ErrorCodeEnum } from '../types/ErrorCodeEnum';
import ApiError from './ApiError';

class NotAuthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401, ErrorCodeEnum.UNAUTHORIZED);
  }
}

export default NotAuthorizedError;