import { ProductCategory } from '@/shared/enum/product.enum'

export interface IProductRepository {
  save: (product: SaveProductInput) => Promise<string>
}

export type SaveProductInput = {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: string
  image: string
  createdAt: Date
}
