export interface IUpdateClientUseCase {
  execute: (input: IUpdateClientUseCase.Input) => Promise<IUpdateClientUseCase.Output>
}

export namespace IUpdateClientUseCase {
  export type Input = {
    id: string
    name: string
    email: string
    cpf: string
  }

  export type Output = string
}
