import { OrderOutput } from '@/domain/types'

export interface IGetAllOrdersUseCase {
  execute: (input: IGetAllOrdersUseCase.Input) => Promise<IGetAllOrdersUseCase.Output>
}

export namespace IGetAllOrdersUseCase {
  export type Input = {
    clientId?: string
    status?: string
    paidAtInitialDate?: Date
    paidAtEndDate?: Date
    createdAtInitialDate?: Date
    createdAtEndDate?: Date
  }

  export type Output = OrderOutput [] | null
}
