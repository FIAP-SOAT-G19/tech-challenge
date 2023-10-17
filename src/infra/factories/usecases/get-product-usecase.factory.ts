import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { JoiValidatorSchemaAdapter } from '../../../infra/adapters/validation/joi-validator.adapter'
import { GetProductUseCase } from '../../../domain/usecases/product/get-product.use-case'

export const makeGetProductUseCase = (): GetProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new GetProductUseCase(
    schemaValidator,
    productRepository
  )
}
