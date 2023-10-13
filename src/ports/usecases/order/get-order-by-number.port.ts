import { OrderOutput } from '@/domain/types/orders.types'

export interface IGetOrderByNumberUseCase {
  execute: (orderNumber: string) => Promise<OrderOutput>
}
