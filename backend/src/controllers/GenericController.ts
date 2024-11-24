/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

class GenericController<T> {
  constructor(private _service: T ) {}

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public async getBy(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public async updateBy(req: Request, res: Response, next: NextFunction): Promise<void> {}

  public async deleteBy(req: Request, res: Response, next: NextFunction): Promise<void> {}
}

export default GenericController;