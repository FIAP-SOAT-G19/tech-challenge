import { GetOrderStatusController } from '@/infra/adapters/controllers/orders/get-order-status.controller'
import { makeGetOrderStatusUseCase } from '../usecases/get-order-status-usecase.factory'

export const makeGetOrderStatusController = (): GetOrderStatusController => {
  return new GetOrderStatusController(makeGetOrderStatusUseCase())
}
