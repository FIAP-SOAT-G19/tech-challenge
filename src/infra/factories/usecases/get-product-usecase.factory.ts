import { GetProductUseCase } from '@/application/usecases/product/get-product.use-case'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'

export const makeGetProductUseCase = (): GetProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const productRepository = new ProductRepository()

  return new GetProductUseCase(
    schemaValidator,
    productRepository
  )
}
