import { ServerError } from '@/infra/shared'
import { IGetProductsUseCase } from '../../interfaces/usecases/product/get-products.interface'
import { IGetProductsGateway } from '@/application/interfaces/gateways/product/get-products-gateway.interface'

export class GetProductsUseCase implements IGetProductsUseCase {
  constructor(
    private readonly gateway: IGetProductsGateway
  ) {}

  async execute(): Promise<IGetProductsUseCase.Output[]> {
    const products = await this.gateway.getProducts()
    if (!products) {
      throw new ServerError()
    }
    return products
  }
}
