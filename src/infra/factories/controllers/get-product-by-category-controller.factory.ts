import { GetProductByCategoryController } from '../../../application/controllers/products/get-product-by-category.controller'
import { makeGetProductByCategoryUseCase } from '../usecases/get-product-by-category-use-case.factory'

export const makeGetProductByCategoryController = (): GetProductByCategoryController => {
  return new GetProductByCategoryController(makeGetProductByCategoryUseCase())
}
