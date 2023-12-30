import { IOrderRepository, IDeleteOrderGateway } from '@/application/interfaces'
import { OrderOutput } from '@/application/usecases/order/orders.types'

export class DeleteOrderGateway implements IDeleteOrderGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async deleteOrder (orderNumber: string): Promise<void> {
    await this.orderRepository.delete(orderNumber)
  }

  async getOrderByNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }
}
