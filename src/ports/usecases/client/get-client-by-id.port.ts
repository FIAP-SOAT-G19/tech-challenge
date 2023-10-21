export interface IGetClientById {
  execute: (input: IGetClientById.Input) => Promise<IGetClientById.Output | null>
}

export namespace IGetClientById {
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
