export interface ICreateEmployee {
  execute: (input: ICreateEmployee.Input) => Promise<ICreateEmployee.Output>
}

export namespace ICreateEmployee {
  export type Input = {
    name: string
    email: string
    cpf: string
    password: string
  }
  export type Output = string
}
