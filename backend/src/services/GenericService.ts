/* eslint-disable @typescript-eslint/no-unused-vars */
import GenericModel from '../models/GenericModel';

class GenericService<T> {
  constructor(private _model = GenericModel<T>) {}
    
  public async create(payload: T): Promise<T | Error> {
    return {} as T;
  }

  public async getAll(): Promise<T[] | Error> {
    return [] as T[];
  }

  public async getBy(filter: T): Promise<T | Error> {
    return {} as T;
  }

  public async updateBy(payload: T, filter: T): Promise<T | Error> {
    return {} as T;
  }

  public async deleteBy(id: string | number): Promise<T | Error>{
    return {} as T;
  }
}

export default GenericService;