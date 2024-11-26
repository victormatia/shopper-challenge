import { ErrorCodeEnum } from '../types/ErrorCodeEnum';
import ApiError from './ApiError';

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400, ErrorCodeEnum.INVALID_DATA);
  }
}

export default BadRequestError;