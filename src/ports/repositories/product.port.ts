export interface IProductRepository {
  save: (product: SaveProductInput) => Promise<string>
  getById: (productId: string) => Promise<GetProductByIdOutput | null>
  getByCategory: (productCategory: string) => Promise<GetProductByCategoryOutput[] | null>
  getAll: () => Promise<GetProducts[] | []>
  update: (
    updateOptions: ProductUpdateOptions
  ) => Promise<GetProductByIdOutput | null>
  delete: (productId: string) => Promise<boolean>
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

export type GetProductByCategoryOutput = {
  id: string
  name: string
  category: string
}

export type GetProducts = {
  id: string
  name: string
  category: string
}

export type ProductUpdateOptions = {
  id: string
  name?: string
  category?: string
  price?: number
  description?: string
  image?: string
}
