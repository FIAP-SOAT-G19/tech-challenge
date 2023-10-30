export interface ICreateEmployeeUseCase {
  execute: (input: ICreateEmployeeUseCase.Input) => Promise<ICreateEmployeeUseCase.Output>
}

export namespace ICreateEmployeeUseCase {
  export type Input = {
    name: string
    email: string
    cpf: string
    password: string
  }
  export type Output = string
}
