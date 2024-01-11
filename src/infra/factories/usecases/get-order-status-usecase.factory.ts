import { GetOrderStatusUseCase } from '@/application/usecases/order/get-order-status.usecase'
import { GetOrderByNumberGateway } from '@/infra/adapters/gateways/order/get-order-by-number.gateway'
import { OrderRepository } from '@/infra/database/repositories/order.repository'

export const makeGetOrderStatusUseCase = (): GetOrderStatusUseCase => {
  const gateway = new GetOrderByNumberGateway(new OrderRepository())
  return new GetOrderStatusUseCase(gateway)
}
