export interface IOrderRepository {
  save: (input: SaveOrderInput) => Promise<string>
  updateStatus: (status: string) => Promise<void>
}

export type SaveOrderInput = {
  id: string
  clientId: string | null
  status: string
  totalValue: number
  createdAt: Date
}
