import { UpdateProductController } from '../../../application/controllers/products/update-product.controller.spec'
import { makeUpdateProductUseCase } from '../usecases/update-product-usecase.factory'

export const makeUpdateProductController = (): UpdateProductController => {
  return new UpdateProductController(makeUpdateProductUseCase())
}
