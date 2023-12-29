import { GetProductsController } from '@/infra/adapters/controllers/products/get-products.controller'
import { makeGetProductsUseCase } from '../usecases/get-products-usecase.factory'

export const makeGetProductsController = (): GetProductsController => {
  return new GetProductsController(makeGetProductsUseCase())
}
