/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../Error/ApiError';

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if(err instanceof ApiError) {
    console.error(err);
    return res.status(err.status).json({message: err.message});
  }
  
  console.error(err);
  return res.status(500).json({ message: 'Server error'});
}