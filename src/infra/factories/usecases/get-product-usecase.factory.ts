import { GetProductUseCase } from '@/application/usecases/product/get-product.use-case'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { GetProductByIdGateway } from '@/infra/adapters/gateways/product/get-product-by-id.gateway'

export const makeGetProductUseCase = (): GetProductUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const gateway = new GetProductByIdGateway(
    new ProductRepository()
  )

  return new GetProductUseCase(
    schemaValidator,
    gateway
  )
}
