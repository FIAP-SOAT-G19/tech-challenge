export interface IUpdateEmployee {
  execute: (input: IUpdateEmployee.Input) => Promise<IUpdateEmployee.Output>
}

export namespace IUpdateEmployee {
  export type Input = {
    id: string
    name?: string
    email?: string
    cpf?: string
    password?: string
  }
  export type Output = string
}
