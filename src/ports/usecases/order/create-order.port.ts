export interface ICreateOrderUseCase {
  execute: (input: ICreateOrderUseCase.Input) => Promise<ICreateOrderUseCase.Output>
}

export namespace ICreateOrderUseCase {
  export type Input = {
    clientId: string | null
    totalValue: number
    paidAt: Date | null
  }
  export type Output = string
}
