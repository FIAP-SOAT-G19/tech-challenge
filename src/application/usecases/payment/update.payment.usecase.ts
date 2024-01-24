import { IUpdatePaymentGateway } from '@/application/interfaces/gateways/payment/update-payment-gateway.interface'
import { IUpdatePaymentStatus } from '@/application/interfaces/usecases/payment/update-payment-status.interface'
import { InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class UpdatePaymentStatusUseCase implements IUpdatePaymentStatus {
  constructor(private readonly gateway: IUpdatePaymentGateway) {}
  async execute (input: IUpdatePaymentStatus.Input): Promise<void> {
    await this.validate(input)
    await this.gateway.updateStatus(input)
  }

  async validate (input: IUpdatePaymentStatus.Input): Promise<void> {
    const { orderNumber, status } = input
    const order = await this.gateway.getByOrderNumber(orderNumber)

    if (!order) {
      throw new InvalidParamError('orderNumber')
    }

    const { APPROVED, REFUSED, WAITING } = constants.PAYMENT_STATUS

    if (![APPROVED, REFUSED, WAITING].includes(status)) {
      throw new InvalidParamError('status')
    }
  }
}
