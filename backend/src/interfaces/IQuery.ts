interface IQuery<T> {
  getAll?(): Promise<T[]>
  getById?(id: string | number): Promise<T | null>
  getByGroup?(group: string): Promise<T[]>
  getBy?(filter: T): Promise<T>
  getMany?(filter: T): Promise<T[]>
}

export default IQuery;