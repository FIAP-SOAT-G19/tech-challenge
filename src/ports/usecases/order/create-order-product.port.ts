export interface ICreateOrderProduct {
  execute: (input: any) => Promise<void>
}

export namespace ICreateOrderProduct {
  export type Input = {
    id: string
    productId: string
    orderId: string
    amount: number
    productPrice: number
    createdAt: Date
  }
}
