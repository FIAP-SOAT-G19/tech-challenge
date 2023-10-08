export interface ICreateClientUseCase {
  execute: (input: ICreateClientUseCase.Input) => Promise<void>
}

export namespace ICreateClientUseCase {
  export type Input = {
    name: string
    email: string
    cpf: string
    password: string
  }
  export type Output = string
}
