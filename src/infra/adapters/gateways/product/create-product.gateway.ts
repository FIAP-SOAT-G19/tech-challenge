import { ICreateProductGateway } from '@/application/interfaces/gateways/product/create-product-gateway.interface'
import { IProductRepository, SaveProductInput } from '@/application/interfaces/repositories/product.interface'

export class CreateProductGateway implements ICreateProductGateway {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async saveProduct (product: SaveProductInput): Promise<string> {
    return await this.productRepository.save(product)
  }
}
