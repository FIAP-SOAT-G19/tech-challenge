import { GetProductByCategoryOutput } from '../../repositories/product.interface'

export interface IGetProductByCategoryGateway {
  getProductByCategory: (productCategory: string) => Promise<GetProductByCategoryOutput[] | null>
}
