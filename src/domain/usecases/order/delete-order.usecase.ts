import { IOrderRepository } from '@/ports'
import { IDeleteOrderUseCase } from '@/ports/usecases/order/delete-order.port'

export class DeleteOrderUseCase implements IDeleteOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute (orderNumber: string): Promise<void> {
    const order = await this.orderRepository.getByOrderNumber(orderNumber)
    if (order) {
      await this.orderRepository.delete(orderNumber)
    }
  }
}
