import { IGetAllOrdersUseCase } from '@/application/interfaces'
import { IGetAllOrdersGateway } from '@/application/interfaces/gateways/order/get-all-order-gateway.interface'
import { InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class GetAllOrdersUseCase implements IGetAllOrdersUseCase {
  constructor(private readonly gateway: IGetAllOrdersGateway) {}
  async execute (input: IGetAllOrdersUseCase.Input): Promise<IGetAllOrdersUseCase.Output> {
    const queryOptions = this.makeQueryOptions(input)
    return this.gateway.getAllOrders(queryOptions)
  }

  private makeQueryOptions (input: IGetAllOrdersUseCase.Input): IGetAllOrdersUseCase.Input {
    const options: IGetAllOrdersUseCase.Input = {}

    if (input.clientId) {
      options.clientId = input.clientId
    }

    if (input.clientDocument) {
      options.clientDocument = input.clientDocument
    }

    if (input.status) {
      const orderStatusValues = Object.values(constants.ORDER_STATUS)
      if (!orderStatusValues.includes(input.status)) {
        throw new InvalidParamError('status')
      }

      options.status = input.status
    }

    if (input.paidAtInitialDate) {
      options.paidAtInitialDate = input.paidAtInitialDate
    }

    if (input.paidAtEndDate) {
      options.paidAtEndDate = input.paidAtEndDate
    }

    if (input.createdAtInitialDate) {
      options.createdAtInitialDate = input.createdAtInitialDate
    }

    if (input.createdAtEndDate) {
      options.createdAtEndDate = input.createdAtEndDate
    }

    return options
  }
}
