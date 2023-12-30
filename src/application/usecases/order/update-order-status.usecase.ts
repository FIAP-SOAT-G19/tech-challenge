import { IUpdateOrderStatusUseCase, IUpdateOrderStatusGateway } from '@/application/interfaces'
import { MissingParamError, InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {
  constructor(private readonly gateway: IUpdateOrderStatusGateway) {}
  async execute (input: IUpdateOrderStatusUseCase.Input): Promise<void> {
    await this.validate(input)

    await this.gateway.updateStatus({
      orderNumber: input.orderNumber,
      status: input.status,
      paidAt: input.status === constants.ORDER_STATUS.RECEIVED ? new Date() : null
    })
  }

  private async validate (input: IUpdateOrderStatusUseCase.Input): Promise<void> {
    if (!input.orderNumber) {
      throw new MissingParamError('orderNumber')
    }

    if (!input.status) {
      throw new MissingParamError('status')
    }

    const order = await this.gateway.getByOrderNumber(input.orderNumber)
    if (!order) {
      throw new InvalidParamError('orderNumber')
    }

    const orderStatusValues = Object.values(constants.ORDER_STATUS)
    if (!orderStatusValues.includes(input.status)) {
      throw new InvalidParamError('status')
    }
  }
}
