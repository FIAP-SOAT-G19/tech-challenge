import { GetProductByIdOutput, ProductUpdateOptions } from '../../repositories/product.interface'

export interface IUpdateProductGateway {
  updateProduct: (
    updateOptions: ProductUpdateOptions
  ) => Promise<GetProductByIdOutput | null>
}
