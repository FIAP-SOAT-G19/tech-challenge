import { IGetProductsGateway } from '@/application/interfaces/gateways/product/get-products-gateway.interface'
import { GetProducts, IProductRepository } from '@/application/interfaces/repositories/product.interface'

export class GetProductsGateway implements IGetProductsGateway {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async getProducts (): Promise<GetProducts[] | []> {
    return await this.productRepository.getAll()
  }
}
