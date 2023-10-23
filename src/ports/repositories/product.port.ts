export interface IProductRepository {
  save: (product: SaveProductInput) => Promise<string>
  getById: (productId: string) => Promise<GetProductByIdOutput | null>
  getAll: () => Promise<GetProducts[] | []>
  update: (
    productId: string,
    updateOptions: ProductUpdateOptions
  ) => Promise<GetProductByIdOutput | null>
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

export type ProductUpdateOptions = {
  name?: string
  category?: string
  price?: number
  description?: string
  image?: string
}

// export interface ProductUpdateOptions {
//   name?: string
//   category?: string
//   price?: number
//   description?: string
//   image?: string
// }
