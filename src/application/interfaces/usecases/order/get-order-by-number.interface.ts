import { OrderOutput } from '@/application/usecases/order/orders.types'

export interface IGetOrderByNumberUseCase {
  execute: (orderNumber: string) => Promise<OrderOutput>
}
