import { GetProductsUseCase } from '@/application/usecases/product/get-products.use-case'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { GetProductsGateway } from '@/infra/adapters/gateways/product/get-products.gateway'

export const makeGetProductsUseCase = (): GetProductsUseCase => {
  const gateway = new GetProductsGateway(
    new ProductRepository()
  )

  return new GetProductsUseCase(
    gateway
  )
}
