import { IOrderRepository, IUpdateOrderStatusGateway, UpdateOrderStatusInput } from '@/application/interfaces'
import { OrderOutput } from '@/application/usecases/order/orders.types'

export class UpdateOrderStatusGateway implements IUpdateOrderStatusGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async updateStatus (input: UpdateOrderStatusInput): Promise<void> {
    await this.orderRepository.updateStatus(input)
  }

  async getByOrderNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }
}
