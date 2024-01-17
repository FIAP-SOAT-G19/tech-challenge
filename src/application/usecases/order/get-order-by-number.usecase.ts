import { IGetOrderByNumberGateway, IGetOrderByNumberUseCase } from '@/application/interfaces'
import { InvalidParamError, MissingParamError } from '@/infra/shared'
import { OrderOutput } from './orders.types'

export class GetOrderByNumberUseCase implements IGetOrderByNumberUseCase {
  constructor(private readonly gateway: IGetOrderByNumberGateway) {}
  async execute (orderNumber: string): Promise<OrderOutput> {
    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }

    const order = await this.gateway.getByOrderNumber(orderNumber)
    if (!order) {
      throw new InvalidParamError('Order not found')
    }
    return order
  }
}
