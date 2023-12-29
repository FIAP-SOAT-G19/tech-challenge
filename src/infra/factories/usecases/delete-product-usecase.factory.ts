import { DeleteProductUseCase } from '@/application/usecases/product/delete-product.use-case'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'

export const makeDeleteProductUseCase = (): DeleteProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new DeleteProductUseCase(
    schemaValidator,
    productRepository
  )
}
