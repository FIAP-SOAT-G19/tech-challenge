import { IUpdateProductGateway } from '@/application/interfaces/gateways/product/update-product-gateway.interface'
import { GetProductByIdOutput, IProductRepository, ProductUpdateOptions } from '@/application/interfaces/repositories/product.interface'

export class UpdateProductGateway implements IUpdateProductGateway {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async updateProduct (updateOptions: ProductUpdateOptions): Promise<GetProductByIdOutput | null> {
    return await this.productRepository.update(updateOptions)
  }
}
