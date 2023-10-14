import { ProductCategory } from '@/shared/enum/product.enum'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: string
  image: string
  amount: number
}
