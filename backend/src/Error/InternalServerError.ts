import { ErrorCodeEnum } from '../types/ErrorCodeEnum';
import ApiError from './ApiError';

class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 500, ErrorCodeEnum.INTERNAL_ERROR);
  }
}

export default InternalServerError;