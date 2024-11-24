import ApiError from './ApiError';

class NotAuthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export default NotAuthorizedError;