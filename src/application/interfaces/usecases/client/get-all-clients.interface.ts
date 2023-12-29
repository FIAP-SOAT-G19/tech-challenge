export interface IGetAllClientsUseCase {
  execute: (input: IGetAllClientsUseCase.Input) => Promise<IGetAllClientsUseCase.Output[] | null>
}

export namespace IGetAllClientsUseCase {
  export type Input = {
    id?: string
    cpf?: string
    email?: string
  }

  export type Output = {
    id: string
    name: string
    cpf: string
    email: string
  }
}
