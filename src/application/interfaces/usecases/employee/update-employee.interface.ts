export interface IUpdateEmployeeUseCase {
  execute: (input: IUpdateEmployeeUseCase.Input) => Promise<IUpdateEmployeeUseCase.Output>
}

export namespace IUpdateEmployeeUseCase {
  export type Input = {
    id: string
    name?: string
    email?: string
    cpf?: string
    password?: string
  }
  export type Output = string
}
