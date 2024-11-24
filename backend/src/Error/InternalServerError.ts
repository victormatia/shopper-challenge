import ApiError from './ApiError';

class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 500);
  }
}

export default InternalServerError;