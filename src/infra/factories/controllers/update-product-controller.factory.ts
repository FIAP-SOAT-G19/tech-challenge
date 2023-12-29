import { UpdateProductController } from '@/infra/adapters/controllers/products/update-product.controller'
import { makeUpdateProductUseCase } from '../usecases/update-product-usecase.factory'

export const makeUpdateProductController = (): UpdateProductController => {
  return new UpdateProductController(makeUpdateProductUseCase())
}
