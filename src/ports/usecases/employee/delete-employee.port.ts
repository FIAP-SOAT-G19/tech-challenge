export interface IDeleteEmployee {
  execute: (input: IDeleteEmployee.Input) => Promise<void>
}

export namespace IDeleteEmployee {
  export type Input = {
    id: string
  }
}
