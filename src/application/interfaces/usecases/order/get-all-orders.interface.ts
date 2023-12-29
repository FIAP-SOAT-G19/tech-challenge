import { OrderOutput } from '@/application/usecases/order/orders.types'

export interface IGetAllOrdersUseCase {
  execute: (input: IGetAllOrdersUseCase.Input) => Promise<IGetAllOrdersUseCase.Output>
}

export namespace IGetAllOrdersUseCase {
  export type Input = {
    clientId?: string
    clientDocument?: string
    status?: string
    paidAtInitialDate?: string
    paidAtEndDate?: string
    createdAtInitialDate?: string
    createdAtEndDate?: string
  }

  export type Output = OrderOutput [] | null
}
