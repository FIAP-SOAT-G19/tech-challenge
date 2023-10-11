export interface IOrderRepository {
  save: (input: SaveOrderInput) => Promise<string>
  updateStatus: (input: UpdateOrderStatusInput) => Promise<void>
}

export type SaveOrderInput = {
  id: string
  orderNumber: string
  clientId: string | null
  clientDocument: string | null
  status: string
  totalValue: number
  createdAt: Date
}

export type UpdateOrderStatusInput = {
  id: string
  status: string
  paidAt: Date | null
}
