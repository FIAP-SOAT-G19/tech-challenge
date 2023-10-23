import { OrderOutput } from '@/domain/types/orders.types'
import { IOrderRepository, IGetOrderByNumberUseCase } from '@/ports'
import { MissingParamError } from '@/shared'

export class GetOrderByNumberUseCase implements IGetOrderByNumberUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute (orderNumber: string): Promise<OrderOutput> {
    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }
    return this.orderRepository.getByOrderNumber(orderNumber)
  }
}
