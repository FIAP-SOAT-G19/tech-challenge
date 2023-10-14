import { Product } from '@/domain/types/products.types'

export interface ICreateOrderUseCase {
  execute: (input: ICreateOrderUseCase.Input) => Promise<ICreateOrderUseCase.Output>
}

export namespace ICreateOrderUseCase {
  export type Input = {
    clientId: string | null
    clientDocument: string | null
    products: Product []
  }
  export type Output = string
}
