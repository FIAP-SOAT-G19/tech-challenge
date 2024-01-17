import { GetProductByCategoryUseCase } from '@/application/usecases/product/get-product-by-category'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { GetProductByCategoryGateway } from '@/infra/adapters/gateways/product/get-product-by-category.gateway'

export const makeGetProductByCategoryUseCase = (): GetProductByCategoryUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const gateway = new GetProductByCategoryGateway(
    new ProductRepository()
  )

  return new GetProductByCategoryUseCase(
    schemaValidator,
    gateway
  )
}
