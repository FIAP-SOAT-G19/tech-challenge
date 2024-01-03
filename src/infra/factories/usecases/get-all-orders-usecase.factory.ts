import { GetAllOrdersUseCase } from '@/application/usecases/order/get-all-orders.usecase'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'
import { GetAllOrdersGateway } from '@/infra/adapters/gateways/order/get-all-orders.gateway'

export const makeGetAllOrdersUseCase = (): GetAllOrdersUseCase => {
  const gateway = new GetAllOrdersGateway(new OrderRepository())
  return new GetAllOrdersUseCase(gateway)
}
