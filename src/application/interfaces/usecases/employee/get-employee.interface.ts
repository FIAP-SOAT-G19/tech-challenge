export interface IGetEmployeeUseCase {
  findById: (id: string) => Promise<IGetEmployeeUseCase.Output>
  findAll: () => Promise<IGetEmployeeUseCase.Output[] | []>
}

export namespace IGetEmployeeUseCase {
  export type Output = {
    id: string
    name: string
    email: string
    cpf: string
    createdAt: Date
    updatedAt: Date | null
  }
}
