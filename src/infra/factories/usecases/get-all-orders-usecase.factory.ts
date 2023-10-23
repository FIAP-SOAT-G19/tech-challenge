import { GetAllOrdersUseCase } from '../../../domain/usecases/order/get-all-orders.usecase'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'

export const makeGetAllOrdersUseCase = (): GetAllOrdersUseCase => {
  const orderRepository = new OrderRepository()
  return new GetAllOrdersUseCase(orderRepository)
}
