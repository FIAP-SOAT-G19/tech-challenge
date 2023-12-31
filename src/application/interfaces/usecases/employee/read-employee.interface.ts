export interface IReadEmployeeUseCase {
  findOne: (input: IReadEmployeeUseCase.Input) => Promise<IReadEmployeeUseCase.Output>
  findAll: () => Promise<IReadEmployeeUseCase.Output[] | []>
}

export namespace IReadEmployeeUseCase {
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
