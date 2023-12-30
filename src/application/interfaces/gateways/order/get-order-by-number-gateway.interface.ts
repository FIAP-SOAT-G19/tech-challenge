import { OrderOutput } from '@/application/usecases/order/orders.types'

export interface IGetOrderByNumberGateway {
  getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
}
