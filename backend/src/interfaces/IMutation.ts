interface IMutation<T> {
  create?(data: T): Promise<T>
  update?(data: T): Promise<T>
  patch?(id: string | number, data: T): Promise<T>
  delete?(id: string | number): Promise<boolean>
}

export default IMutation;