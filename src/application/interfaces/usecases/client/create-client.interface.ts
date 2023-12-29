export interface ICreateClientUseCase {
  execute: (input: ICreateClientUseCase.Input) => Promise<ICreateClientUseCase.Output>
}

export namespace ICreateClientUseCase {
  export type Input = {
    name: string
    email: string
    cpf: string
    password: string
    repeatPassword: string
  }
  export type Output = string
}
