/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../Error/ApiError';
import { ErrorCodeEnum } from '../types/ErrorCodeEnum';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if(err instanceof ApiError) {
    console.error(err);

    return res.status(err.status).json(
      {
        error_code: err.status_code,
        error_description: err.message,
      },
    );
  }
  
  console.error(err);
  
  return res.status(500).json(
    {
      error_code: ErrorCodeEnum.INTERNAL_ERROR,
      error_description: err.message,
    },
  );
}