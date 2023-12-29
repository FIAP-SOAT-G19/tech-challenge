import { ServerError } from '@/infra/shared'
import { IProductRepository } from '../../interfaces/repositories/product.interface'
import { IGetProductsUseCase } from '../../interfaces/usecases/product/get-products.interface'

export class GetProductsUseCase implements IGetProductsUseCase {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async execute(): Promise<IGetProductsUseCase.Output[]> {
    const products = await this.productRepository.getAll()
    if (!products) {
      throw new ServerError()
    }
    return products
  }
}
