export interface ICreateOrderUseCase {
  execute: (input: ICreateOrderUseCase.Input) => Promise<ICreateOrderUseCase.Output>
}

export namespace ICreateOrderUseCase {
  export type Input = {
    clientId?: string
    totalValue: number
  }
  export type Output = string
}
