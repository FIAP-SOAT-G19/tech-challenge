import { UpdateProductUseCase } from '@/application/usecases/product/update-product.use-case'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { UpdateProductGateway } from '@/infra/adapters/gateways/product/update-product.gateway'

export const makeUpdateProductUseCase = (): UpdateProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const gateway = new UpdateProductGateway(
    new ProductRepository()
  )

  return new UpdateProductUseCase(
    schemaValidator,
    gateway
  )
}
