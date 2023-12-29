export interface ILoginClientUseCase {
  execute: (input: ILoginClientUseCase.Input) => Promise<ILoginClientUseCase.Output>
}

export namespace ILoginClientUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    name: string
    email: string
    cpf: string
  }
}
