export interface IDeleteEmployee {
  execute: (input: IDeleteEmployee.Input) => Promise<IDeleteEmployee.Output>
}

export namespace IDeleteEmployee {
  export type Input = {
    id: string
  }
  export type Output = string
}
