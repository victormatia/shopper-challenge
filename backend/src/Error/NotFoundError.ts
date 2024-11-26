import { ErrorCodeEnum } from '../types/ErrorCodeEnum';
import ApiError from './ApiError';

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404, ErrorCodeEnum.DRIVER_NOT_FOUND);
  }
}

export default NotFoundError;