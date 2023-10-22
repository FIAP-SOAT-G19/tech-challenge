export interface IDeleteClientUseCase {
  execute: (input: IDeleteClientUseCase.Input) => Promise<IDeleteClientUseCase.Output>
}

export namespace IDeleteClientUseCase {
  export type Input = { id: string }
  export type Output = string
}
