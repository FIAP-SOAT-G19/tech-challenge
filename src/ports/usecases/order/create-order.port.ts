import { OrderProduct } from '@/domain/types'

export interface ICreateOrderUseCase {
  execute: (input: ICreateOrderUseCase.Input) => Promise<ICreateOrderUseCase.Output>
}

export namespace ICreateOrderUseCase {
  export type Input = {
    clientId: string | null
    clientDocument: string | null
    products: OrderProduct []
  }
  export type Output = {
    orderNumber: string
  }
}
