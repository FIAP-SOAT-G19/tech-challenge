import { IOrderRepository } from '@/ports'
import { IHandleProcessedPayment } from '@/ports/usecases/payment/handle-processed-payment.port'
import constants from '@/shared/constants'
import { MissingParamError } from '@/shared/errors'

export class HandleProcessedPayment implements IHandleProcessedPayment {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute (input: IHandleProcessedPayment.Input): Promise<void> {
    if (!input.orderNumber) {
      throw new MissingParamError('orderNumber')
    }

    if (!input.paymentStatus) {
      throw new MissingParamError('paymentStatus')
    }

    await this.orderRepository.updateStatus({
      orderNumber: input.orderNumber,
      status: input.paymentStatus === constants.PAID_MARKET.STATUS_APPROVED ? constants.ORDER_STATUS.RECEIVED : constants.ORDER_STATUS.CANCELED,
      paidAt: new Date()
    })
  }
}
