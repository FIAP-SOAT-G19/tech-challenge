export interface IUpdatePaymentStatus {
  execute: (input: IUpdatePaymentStatus.Input) => Promise<void>
}

export namespace IUpdatePaymentStatus {
  export type Input = {
    orderNumber: string
    status: string
    reason: string | null
  }
}
