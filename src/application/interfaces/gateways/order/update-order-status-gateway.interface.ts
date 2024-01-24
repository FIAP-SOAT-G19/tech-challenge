import { OrderOutput } from '@/application/usecases/order/orders.types'
import { UpdateOrderStatusInput } from '../../repositories/order.interface'

export interface IUpdateOrderStatusGateway {
  updateStatus: (input: UpdateOrderStatusInput) => Promise<void>
  getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
}
