import { GetProductByCategoryUseCase } from '@/application/usecases/product/get-product-by-category'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'

export const makeGetProductByCategoryUseCase = (): GetProductByCategoryUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new GetProductByCategoryUseCase(
    schemaValidator,
    productRepository
  )
}
