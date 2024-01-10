import { IGetProductByIdGateway } from '@/application/interfaces/gateways/product/get-product-by-id-gateway.interface'
import { GetProductByIdOutput, IProductRepository } from '@/application/interfaces/repositories/product.interface'

export class GetProductByIdGateway implements IGetProductByIdGateway {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async getProductById (productId: string): Promise<GetProductByIdOutput | null> {
    return await this.productRepository.getById(productId)
  }
}
