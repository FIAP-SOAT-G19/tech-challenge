import { GetProductController } from '../../../application/controllers/products/get-product.controller'
import { makeGetProductUseCase } from '../usecases/get-product-usecase.factory'

export const makeGetProductController = (): GetProductController => {
  return new GetProductController(makeGetProductUseCase())
}
