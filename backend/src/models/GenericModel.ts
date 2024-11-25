import IMutation from '../interfaces/IMutation';
import IQuery from '../interfaces/IQuery';

abstract class GenericModel<T> implements IQuery<T>, IMutation<T> {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async create(data: T): Promise<T> {
    return {} as T;
  }

  public async getAll(): Promise<T[]> {
    return [] as T[];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getById(id: string | number): Promise<T | null> {
    return {} as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getBy(filter: T): Promise<T> {
    return {} as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getMany(filter: T): Promise<T[]> {
    return [] as T[];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getByGroup(group: string): Promise<T[]> {
    return [] as T[];
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async update(data: T): Promise<T> {
    return {} as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async patch(id: string | number): Promise<T> {
    return {} as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async delete(id: string | number): Promise<boolean> {
    return false;
  }
}

export default GenericModel;