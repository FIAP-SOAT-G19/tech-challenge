import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { JoiValidatorSchemaAdapter } from '../../../infra/adapters/validation/joi-validator.adapter'
import { DeleteProductUseCase } from '../../../domain/usecases/product/delete-product.use-case'

export const makeDeleteProductUseCase = (): DeleteProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new DeleteProductUseCase(
    schemaValidator,
    productRepository
  )
}
