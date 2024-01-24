import { IGetAllOrdersUseCase, IGetAllOrdersGateway, IGetAllOrdersPresenter } from '@/application/interfaces'
import { InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class GetAllOrdersUseCase implements IGetAllOrdersUseCase {
  constructor(
    private readonly gateway: IGetAllOrdersGateway,
    private readonly presenter: IGetAllOrdersPresenter
  ) {}

  async execute (input: IGetAllOrdersUseCase.Input): Promise<IGetAllOrdersUseCase.Output> {
    const queryOptions = this.makeQueryOptions(input)
    const orders = await this.gateway.getAllOrders(queryOptions)
    const ordenatedOrders = this.presenter.createOrdenation(orders)

    return ordenatedOrders
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
