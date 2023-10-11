export interface IUpdateStatusOrder {
  execute: (input: IUpdateStatusOrder.Input) => Promise<void>
}

export namespace IUpdateStatusOrder {
  export type Input = {
    orderId: string

  }
}
