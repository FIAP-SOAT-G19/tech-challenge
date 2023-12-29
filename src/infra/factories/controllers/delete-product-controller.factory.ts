import { DeleteProductController } from '@/infra/adapters/controllers/products/delete-product.controller'
import { makeDeleteProductUseCase } from '../usecases/delete-product-usecase.factory'

export const makeDeleteProductController = (): DeleteProductController => {
  return new DeleteProductController(makeDeleteProductUseCase())
}
