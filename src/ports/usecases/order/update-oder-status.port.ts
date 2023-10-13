export interface IUpdateOrderStatus {
  execute: (input: IUpdateOrderStatus.Input) => Promise<void>
}

export namespace IUpdateOrderStatus {
  export type Input = {
    orderNumber: string
    status: string
  }
}
