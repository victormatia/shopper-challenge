import { ErrorCodeEnum } from '../types/ErrorCodeEnum';
import ApiError from './ApiError';

class BadRequestError extends ApiError {
  constructor(message: string, error_code: ErrorCodeEnum = ErrorCodeEnum.INVALID_DATA) {
    super(message, 400, error_code);
  }
}

export default BadRequestError;