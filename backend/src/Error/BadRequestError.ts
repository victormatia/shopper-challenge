import ApiError from './ApiError';

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestError;