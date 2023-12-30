import { GetOrderByNumberUseCase } from '@/application/usecases/order/get-order-by-number.usecase'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'
import { GetOrderByNumberGateway } from '@/infra/adapters/gateways/order/get-order-by-number.gateway'

export const makeGetOrderByNumberUseCase = (): GetOrderByNumberUseCase => {
  const gateway = new GetOrderByNumberGateway(new OrderRepository())
  return new GetOrderByNumberUseCase(gateway)
}
