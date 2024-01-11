import { GetProductByIdOutput } from '../../repositories/product.interface'

export interface IGetProductByIdGateway {
  getProductById: (productId: string) => Promise<GetProductByIdOutput | null>
}
