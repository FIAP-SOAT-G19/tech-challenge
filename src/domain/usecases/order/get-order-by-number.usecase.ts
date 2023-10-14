import { OrderOutput } from '@/domain/types/orders.types'
import { IOrderRepository } from '@/ports'
import { IGetOrderByNumberUseCase } from '@/ports/usecases/order/get-order-by-number.port'
import { MissingParamError } from '../../../shared/errors'

export class GetOrderByNumberUseCase implements IGetOrderByNumberUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute (orderNumber: string): Promise<OrderOutput> {
    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }
    const order = await this.orderRepository.getByOrderNumber(orderNumber)
    return order
  }
}
