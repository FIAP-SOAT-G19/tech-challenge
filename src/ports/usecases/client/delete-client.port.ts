export interface IDeleteClientUseCase {
  execute: (input: IDeleteClientUseCase.Input) => Promise<void>
}

export namespace IDeleteClientUseCase {
  export type Input = { id: string }
}
