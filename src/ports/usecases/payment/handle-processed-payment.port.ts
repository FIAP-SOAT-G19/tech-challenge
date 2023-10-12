export interface IHandleProcessedPayment {
  execute: (input: IHandleProcessedPayment.Input) => Promise<void>
}

export namespace IHandleProcessedPayment {
  export type Input = {
    orderNumber: string
    paymentStatus: string
  }
}
