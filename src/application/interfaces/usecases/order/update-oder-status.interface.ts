export interface IUpdateOrderStatusUseCase {
  execute: (input: IUpdateOrderStatusUseCase.Input) => Promise<void>
}

export namespace IUpdateOrderStatusUseCase {
  export type Input = {
    orderNumber: string
    status: string
  }
}
