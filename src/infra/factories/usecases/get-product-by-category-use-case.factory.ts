import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { JoiValidatorSchemaAdapter } from '../../../infra/adapters/validation/joi-validator.adapter'
import { GetProductByCategoryUseCase } from '../../../domain/usecases/product/get-product-by-category'

export const makeGetProductByCategoryUseCase = (): GetProductByCategoryUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new GetProductByCategoryUseCase(
    schemaValidator,
    productRepository
  )
}
