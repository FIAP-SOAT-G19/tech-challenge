import { OrderOutput } from '@/application/usecases/order/orders.types'

export interface IDeleteOrderGateway {
  deleteOrder: (orderNumber: string) => Promise<void>
  getOrderByNumber: (orderNumber: string) => Promise<OrderOutput>
}
