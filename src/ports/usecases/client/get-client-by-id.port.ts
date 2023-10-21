export interface IGetClientByIdUseCase {
  execute: (input: IGetClientByIdUseCase.Input) => Promise<IGetClientByIdUseCase.Output | null>
}

export namespace IGetClientByIdUseCase {
  export type Input = {
    id: string
  }

  export type Output = {
    id: string
    name: string
    cpf: string
    email: string
  }
}
