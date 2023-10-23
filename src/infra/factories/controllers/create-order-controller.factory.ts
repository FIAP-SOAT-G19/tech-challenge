import { CreateOrderController } from '../../../application/controllers/orders/create-order.controller'
import { makeCreateOrderUseCase } from '../usecases/create-order-usecase.factory'

export const makeCreateOrderController = (): CreateOrderController => {
  return new CreateOrderController(makeCreateOrderUseCase())
}
