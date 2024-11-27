import { ErrorCodeEnum } from '../types/ErrorCodeEnum';
import ApiError from './ApiError';

class NotAcceptable extends ApiError {
  constructor(message: string) {
    super(message, 406, ErrorCodeEnum.INVALID_DISTANCE);
  }
}

export default NotAcceptable;