import { UpdateOrderStatusUseCase } from '@/application/usecases/order/update-order-status.usecase'
import { OrderRepository } from '../../database/repositories/order.repository'
import { UpdateOrderStatusGateway } from '@/infra/adapters/gateways/order/update-order-status.gateway'

export const makeUpdateOrderStatusUseCase = (): UpdateOrderStatusUseCase => {
  const gateway = new UpdateOrderStatusGateway(new OrderRepository())
  return new UpdateOrderStatusUseCase(gateway)
}
