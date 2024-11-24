import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../Error/BadRequestError';
import JWT from '../Auth/JWT';
import NotAuthorizedError from '../Error/NotAuthorizedError';

export default function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) throw new BadRequestError('Request without token');

  try {
    JWT.verifyToken(authorization);
    next();
  } catch(e) {
    throw new NotAuthorizedError('Invalid Token');
  }
}