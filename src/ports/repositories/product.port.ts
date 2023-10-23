import { Product } from '@/domain/types'

export interface IProductRepository {
  save: (product: SaveProductInput) => Promise<string>
  getById: (id: string) => Promise<Product | null>
}

export type SaveProductInput = {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  createdAt: Date
}
