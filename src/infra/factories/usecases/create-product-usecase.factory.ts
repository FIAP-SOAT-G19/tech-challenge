import { CreateProductUseCase } from '@/application/usecases/product/create-product.use-case'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'

export const makeCreateProductUseCase = (): CreateProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const productRepository = new ProductRepository()

  return new CreateProductUseCase(
    schemaValidator,
    uuidGenerator,
    productRepository
  )
}
