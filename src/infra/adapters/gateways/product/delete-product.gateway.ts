import { IDeleteProductGateway } from '@/application/interfaces/gateways/product/delete-product-gateway.interface'
import { IProductRepository } from '@/application/interfaces/repositories/product.interface'

export class DeleteProductGateway implements IDeleteProductGateway {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

  async deleteProduct (productId: string): Promise<boolean> {
    return await this.productRepository.delete(productId)
  }
}
