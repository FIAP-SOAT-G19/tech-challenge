import { GetOrderByNumberController } from '@/infra/adapters/controllers/orders/get-order-by-number.controller'
import { makeGetOrderByNumberUseCase } from '../usecases/get-order-by-number-usecase.factory'

export const makeGetOrderByNumberController = (): GetOrderByNumberController => {
  return new GetOrderByNumberController(makeGetOrderByNumberUseCase())
}
