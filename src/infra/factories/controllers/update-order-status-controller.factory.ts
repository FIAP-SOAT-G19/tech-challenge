import { UpdateOrderStatusController } from '@/infra/adapters/controllers/orders/update-order-status.controller'
import { makeUpdateOrderStatusUseCase } from '../usecases/update-order-status-usecase.factory'

export const makeUpdateOrderStatusUseCaseController = (): UpdateOrderStatusController => {
  return new UpdateOrderStatusController(makeUpdateOrderStatusUseCase())
}
