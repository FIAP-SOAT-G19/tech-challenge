export interface IReadEmployee {
  execute: (input: IReadEmployee.Input) => Promise<IReadEmployee.Output>
}

export namespace IReadEmployee {
  export type Input = {
    id: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    cpf: string
    createdAt: Date
    updatedAt: Date
  }
}
