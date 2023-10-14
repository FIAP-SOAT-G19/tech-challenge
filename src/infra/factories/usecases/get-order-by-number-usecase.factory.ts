import { GetOrderByNumberUseCase } from '../../../domain/usecases/order/get-order-by-number.usecase'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'

export const makeGetOrderByNumberUseCase = (): GetOrderByNumberUseCase => {
  const orderRepository = new OrderRepository()
  return new GetOrderByNumberUseCase(orderRepository)
}
