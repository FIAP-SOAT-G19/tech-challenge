export interface IDeleteEmployeeUseCase {
  execute: (input: IDeleteEmployeeUseCase.Input) => Promise<void>
}

export namespace IDeleteEmployeeUseCase {
  export type Input = {
    id: string
  }
}
