import { ProductCategory } from '@/shared/enum/product.enum'

export interface ICreateProductUseCase {
  execute: (input: ICreateProductUseCase.Input) => Promise<ICreateProductUseCase.Output>
}

export namespace ICreateProductUseCase {
  export type Input = {
    name: string
    category: ProductCategory
    price: number
    description: string
    image: string
  }
  export type Output = string
}
