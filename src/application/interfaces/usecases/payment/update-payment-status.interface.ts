export interface IUpdatePaymentStatus {
  execute: (input: IUpdatePaymentStatus.Input) => Promise<void>
}

namespace IUpdatePaymentStatus {
  export type Input = {
    orderNumber: string
    status: string
  }
}
