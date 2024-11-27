import { ErrorCodeEnum } from '../types/ErrorCodeEnum';
import ApiError from './ApiError';

class NotFoundError extends ApiError {
  constructor(message: string, error_code: ErrorCodeEnum = ErrorCodeEnum.NOT_FOUND) {
    super(message, 404, error_code);
  }
}

export default NotFoundError;