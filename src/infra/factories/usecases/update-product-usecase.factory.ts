import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { JoiValidatorSchemaAdapter } from '../../../infra/adapters/validation/joi-validator.adapter'
import { UpdateProductUseCase } from '../../../domain/usecases/product/update-product.use-case'

export const makeUpdateProductUseCase = (): UpdateProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new UpdateProductUseCase(
    schemaValidator,
    productRepository
  )
}
