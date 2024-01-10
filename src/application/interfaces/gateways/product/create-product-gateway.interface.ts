import { SaveProductInput } from '../../repositories/product.interface'

export interface ICreateProductGateway {
  saveProduct: (product: SaveProductInput) => Promise<string>
}
