import { IGetOrderByNumberGateway, IGetOrderByNumberUseCase } from '@/application/interfaces'
import { MissingParamError } from '@/infra/shared'
import { OrderOutput } from './orders.types'

export class GetOrderByNumberUseCase implements IGetOrderByNumberUseCase {
  constructor(private readonly gateway: IGetOrderByNumberGateway) {}
  async execute (orderNumber: string): Promise<OrderOutput> {
    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }
    return this.gateway.getByOrderNumber(orderNumber)
  }
}
