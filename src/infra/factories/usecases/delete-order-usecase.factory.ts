import { DeleteOrderUseCase } from '@/application/usecases/order/delete-order.usecase'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'
import { DeleteOrderGateway } from '@/infra/adapters/gateways/order/delete-order-gateway'

export const makeDeleteOrderUseCase = (): DeleteOrderUseCase => {
  const gateway = new DeleteOrderGateway(new OrderRepository())
  return new DeleteOrderUseCase(gateway)
}
