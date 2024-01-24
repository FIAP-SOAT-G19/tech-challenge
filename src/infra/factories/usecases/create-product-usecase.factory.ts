import { CreateProductUseCase } from '@/application/usecases/product/create-product.use-case'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { CreateProductGateway } from '../../../infra/adapters/gateways/product/create-product.gateway'

export const makeCreateProductUseCase = (): CreateProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const gateway = new CreateProductGateway(
    new ProductRepository()
  )

  return new CreateProductUseCase(
    schemaValidator,
    uuidGenerator,
    gateway
  )
}
