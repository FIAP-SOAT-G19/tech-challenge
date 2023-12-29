import { IGetOrderByNumberUseCase, IOrderRepository } from '@/application/interfaces'
import { MissingParamError } from '@/infra/shared'
import { OrderOutput } from './orders.types'

export class GetOrderByNumberUseCase implements IGetOrderByNumberUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute (orderNumber: string): Promise<OrderOutput> {
    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }
    return this.orderRepository.getByOrderNumber(orderNumber)
  }
}
