import { OrderOutput } from '@/application/usecases/order/orders.types'

export interface IOrderRepository {
  save: (input: SaveOrderInput) => Promise<string>
  updateStatus: (input: UpdateOrderStatusInput) => Promise<void>
  getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
  delete: (orderNumber: string) => Promise<void>
  getAll: (input: GetAllOrdersInput) => Promise<GetAllOrdersOutput>
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
  orderNumber: string
  status: string
  paidAt: Date | null
}

export type GetAllOrdersInput = {
  clientId?: string
  clientDocument?: string
  status?: string
  paidAtInitialDate?: string
  paidAtEndDate?: string
  createdAtInitialDate?: string
  createdAtEndDate?: string
}

export type GetAllOrdersOutput = OrderOutput [] | null
