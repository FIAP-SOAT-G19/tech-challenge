import { UpdateProductUseCase } from '@/application/usecases/product/update-product.use-case'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'

export const makeUpdateProductUseCase = (): UpdateProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new UpdateProductUseCase(
    schemaValidator,
    productRepository
  )
}
