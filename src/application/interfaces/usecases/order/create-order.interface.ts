import { OrderProduct } from '@/application/usecases/order/orders.types'

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
