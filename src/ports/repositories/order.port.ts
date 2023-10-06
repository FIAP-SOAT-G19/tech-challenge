export interface IOrderRepository {
  save: (input: SaveOrderInput) => Promise<string>
}

export type SaveOrderInput = {
  id: string
  clientId: string
  totalValue: number
  createdAt: Date
  paidAt: Date
}
