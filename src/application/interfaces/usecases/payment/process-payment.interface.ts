export interface IProcessPaymentUseCase {
  execute: (input: IProcessPaymentUseCase.Input) => Promise<IProcessPaymentUseCase.Output>
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
      expiration: string
    }
    orderNumber: string
  }

  export type Output = {
    status: string
    reason: string | null
  }
}
