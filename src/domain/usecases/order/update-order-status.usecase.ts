import { IUpdateOrderStatusUseCase } from '@/ports/usecases/order/update-oder-status.port'
import constants from '../../../shared/constants'
import { InvalidParamError, MissingParamError } from '../../../shared/errors'
import { IOrderRepository } from '@/ports'

export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute (input: IUpdateOrderStatusUseCase.Input): Promise<void> {
    await this.validate(input)

    await this.orderRepository.updateStatus({
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

    const order = await this.orderRepository.getByOrderNumber(input.orderNumber)
    if (!order) {
      throw new InvalidParamError('orderNumber')
    }

    const orderStatusValues = Object.values(constants.ORDER_STATUS)
    if (!orderStatusValues.includes(input.status)) {
      throw new InvalidParamError('status')
    }
  }
}
