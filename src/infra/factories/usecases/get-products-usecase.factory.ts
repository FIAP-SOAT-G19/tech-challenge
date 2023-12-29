import { GetProductsUseCase } from '@/application/usecases/product/get-products.use-case'
import { ProductRepository } from '../../../infra/database/repositories/product.repository'

export const makeGetProductsUseCase = (): GetProductsUseCase => {
  const productRepository = new ProductRepository()

  return new GetProductsUseCase(
    productRepository
  )
}
