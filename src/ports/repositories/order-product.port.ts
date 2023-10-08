export interface IOrderProductRepository {
  save: (input: SaveOrderProductInput) => Promise<void>
}

export type SaveOrderProductInput = {
  id: string
  productId: string
  orderId: string
  amount: number
  productPrice: number
  createdAt: Date
}
