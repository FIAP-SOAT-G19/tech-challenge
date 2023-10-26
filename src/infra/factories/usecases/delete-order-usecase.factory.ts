import { DeleteOrderUseCase } from '../../../domain/usecases/order/delete-order.usecase'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'

export const makeDeleteOrderUseCase = (): DeleteOrderUseCase => {
  const orderRepository = new OrderRepository()
  return new DeleteOrderUseCase(orderRepository)
}
