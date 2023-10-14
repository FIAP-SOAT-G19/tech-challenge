export interface IProductRepository {
  save: (product: SaveProductInput) => Promise<string>
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
