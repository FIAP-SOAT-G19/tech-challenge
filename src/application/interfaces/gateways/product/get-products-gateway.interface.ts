import { GetProducts } from '../../repositories/product.interface'

export interface IGetProductsGateway {
  getProducts: () => Promise<GetProducts[] | []>
}
