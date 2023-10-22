export interface IProductRepository {
  save: (product: SaveProductInput) => Promise<string>
  getById: (productId: string) => Promise<GetProductByIdOutput | null>
  getAll: () => Promise<GetProducts[] | []>
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

export type GetProductByIdOutput = {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
}

export type GetProducts = {
  id: string
  name: string
  category: string
}
