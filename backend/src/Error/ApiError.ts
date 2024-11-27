import { ErrorCodeEnum } from '../types/ErrorCodeEnum';

class ApiError extends Error {
  constructor(message: string, private _status: number, private _status_code: ErrorCodeEnum) {
    super(message);
  }

  public get status(): number {
    return this._status;
  }

  public get status_code(): string {
    return ErrorCodeEnum[this._status_code];
  }

}

export default ApiError;
