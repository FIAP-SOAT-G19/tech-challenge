import { GetAllOrdersController } from '../../../application/controllers/orders/get-all-orders.controller'
import { makeGetAllOrdersUseCase } from '../usecases/get-all-orders-usecase.factory'

export const makeGetAllOrdersController = (): GetAllOrdersController => {
  return new GetAllOrdersController(makeGetAllOrdersUseCase())
}
