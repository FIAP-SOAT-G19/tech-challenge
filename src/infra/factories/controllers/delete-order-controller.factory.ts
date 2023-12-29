import { DeleteOrderController } from '@/infra/adapters/controllers/orders/delete-order.controller'
import { makeDeleteOrderUseCase } from '../usecases/delete-order-usecase.factory'

export const makeDeleteOrderController = (): DeleteOrderController => {
  return new DeleteOrderController(makeDeleteOrderUseCase())
}
