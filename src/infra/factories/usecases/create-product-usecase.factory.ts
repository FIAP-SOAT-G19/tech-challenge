import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { UUIDGeneratorAdapter } from '../../../infra/adapters/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '../../../infra/adapters/validation/joi-validator.adapter'
import { CreateProductUseCase } from '../../../domain/usecases/product/create-product.use-case'

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
