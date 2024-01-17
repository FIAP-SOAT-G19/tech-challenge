import { IOrderRepository, IGetOrderByNumberGateway } from '@/application/interfaces'
import { OrderOutput } from '@/application/usecases/order/orders.types'

export class GetOrderByNumberGateway implements IGetOrderByNumberGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async getByOrderNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }
}
