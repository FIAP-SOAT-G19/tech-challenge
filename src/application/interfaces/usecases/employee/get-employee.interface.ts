export interface IGetEmployeeUseCase {
  findById: (input: IGetEmployeeUseCase.Input) => Promise<IGetEmployeeUseCase.Output>
  findAll: () => Promise<IGetEmployeeUseCase.Output[] | []>
}

export namespace IGetEmployeeUseCase {
  export type Input = {
    id: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    cpf: string
    createdAt: Date
    updatedAt: Date | null
  }
}
