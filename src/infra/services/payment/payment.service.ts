import { IPayment } from '@/ports'
import constants from '@/shared/constants'

export class PaymentService implements IPayment {
  async process(input: IPayment.Input): Promise<IPayment.Output> {
    const status = input.total_amount < 15000 ? constants.ORDER_STATUS.RECEIVED : constants.ORDER_STATUS.CANCELED
    return { status }
  }
}
