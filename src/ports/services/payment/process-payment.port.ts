export interface IPayment {
  process: (input: IPayment.Input) => Promise<IPayment.Output>
}

export namespace IPayment {
  export type Input = {
    external_reference: string
    title: string
    total_amount: number
    items: PaymentItems []
  }
  export type Output = {
    status: string
  }
}

export type PaymentItems = {
  category: string
  title: string
  description: string
  unit_price: number
  amount: number
  total_amount: number
}
