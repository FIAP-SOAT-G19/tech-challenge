import { IOrderRepository } from '@/ports'
import { IGetAllOrdersUseCase } from '@/ports/usecases/order/get-all-orders.port'
import constants from '../../../shared/constants'
import { InvalidParamError } from '../../../shared/errors'

export class GetAllOrdersUseCase implements IGetAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute (input: IGetAllOrdersUseCase.Input): Promise<IGetAllOrdersUseCase.Output> {
    const queryOptions = this.makeQueryOptions(input)
    const orders = await this.orderRepository.getAll(queryOptions)
    return orders
  }

  private makeQueryOptions (input: IGetAllOrdersUseCase.Input): IGetAllOrdersUseCase.Input {
    const options: IGetAllOrdersUseCase.Input = {}

    if (input.clientId) {
      options.clientId = input.clientId
    }

    if (input.status) {
      const orderStatusValues = Object.values(constants.ORDER_STATUS)
      if (!orderStatusValues.includes(input.status)) {
        throw new InvalidParamError('status')
      }

      options.status = input.status
    }

    if (input.paidAtInitialDate) {
      options.paidAtInitialDate = new Date(input.paidAtInitialDate)
    }

    if (input.paidAtEndDate) {
      options.paidAtEndDate = new Date(input.paidAtEndDate)
    }

    if (input.createdAtInitialDate) {
      options.createdAtInitialDate = new Date(input.createdAtInitialDate)
    }

    if (input.createdAtEndDate) {
      options.createdAtEndDate = new Date(input.createdAtEndDate)
    }

    return options
  }
}