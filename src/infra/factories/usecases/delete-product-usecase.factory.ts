import { DeleteProductUseCase } from '@/application/usecases/product/delete-product.use-case'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { DeleteProductGateway } from '@/infra/adapters/gateways/product/delete-product.gateway'

export const makeDeleteProductUseCase = (): DeleteProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const gateway = new DeleteProductGateway(
    new ProductRepository()
  )

  return new DeleteProductUseCase(
    schemaValidator,
    gateway
  )
}
