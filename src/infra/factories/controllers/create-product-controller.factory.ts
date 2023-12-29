import { CreateProductController } from '@/infra/adapters/controllers/products/create-product.controller'
import { makeCreateProductUseCase } from '../usecases/create-product-usecase.factory'

export const makeCreateProductController = (): CreateProductController => {
  return new CreateProductController(makeCreateProductUseCase())
}
