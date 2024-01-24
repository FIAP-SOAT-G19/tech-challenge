export interface IProcessPaymentUseCase {
  execute: (input: IProcessPaymentUseCase.Input) => Promise<void>
}

export namespace IProcessPaymentUseCase {
  export type Input = {
    payer: {
      name: string
      document: string
    }
    creditCard: {
      brand: string
      number: string
      cvv: string
      expiryMonth: string
      expiryYear: string
    }
    orderNumber: string
  }
}
