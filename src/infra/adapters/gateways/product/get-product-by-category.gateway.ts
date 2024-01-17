import { IGetProductByCategoryGateway } from '@/application/interfaces/gateways/product/get-product-by-category.gateway.interface'
import { GetProductByCategoryOutput, IProductRepository } from '@/application/interfaces/repositories/product.interface'

export class GetProductByCategoryGateway implements IGetProductByCategoryGateway {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async getProductByCategory (productCategory: string): Promise<GetProductByCategoryOutput[] | null> {
    return await this.productRepository.getByCategory(productCategory)
  }
}
