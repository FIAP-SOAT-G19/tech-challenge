import { ISchemaValidator } from '@/application/interfaces'
import { IPaymentGateway } from '@/application/interfaces/gateways/payment/process-payment-gateway.interface'
import { IProcessPaymentUseCase } from '@/application/interfaces/usecases/payment/process-payment.interface'
import { ICardValidator } from '@/application/interfaces/validators/card-validator.interface'
import { InvalidParamError, SchemaValidationError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class ProcessPaymentUseCase implements IProcessPaymentUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly cardValidator: ICardValidator,
    private readonly gateway: IPaymentGateway
  ) {}

  async execute (input: IProcessPaymentUseCase.Input): Promise<void> {
    await this.validate(input)
    await this.gateway.updateStatus({ orderNumber: input.orderNumber, status: constants.PAYMENT_STATUS.PROCESSING, reason: null })
    await this.gateway.processPayment(input)
  }

  async validate (input: IProcessPaymentUseCase.Input): Promise<void> {
    this.schemaValidation(input)
    this.cardValidation(input.creditCard)
    await this.orderValidation(input.orderNumber)
    await this.paymentValidation(input.orderNumber)
  }

  schemaValidation (input: IProcessPaymentUseCase.Input): void {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.PAYMENT,
      data: input
    })

    if (validation.error) {
      throw new SchemaValidationError(validation.error)
    }
  }

  cardValidation(creditCard: ICardValidator.Input): void {
    const cardError = this.cardValidator.validate(creditCard)
    if (cardError) {
      throw new InvalidParamError(`CreditCard: ${cardError.field}`)
    }
  }

  async orderValidation(orderNumber: string): Promise<void> {
    const order = await this.gateway.getByOrderNumber(orderNumber)

    if (!order) {
      throw new InvalidParamError('orderNumber')
    }

    if (order.status !== constants.ORDER_STATUS.WAITING_PAYMENT) {
      throw new InvalidParamError('This payment cannot be processed')
    }
  }

  async paymentValidation(orderNumber: string): Promise<void> {
    const paymentsInProcessing = await this.gateway.countPaymentByStatusAndOrderNumber(constants.PAYMENT_STATUS.PROCESSING, orderNumber)
    if (paymentsInProcessing > 0) {
      throw new InvalidParamError('This payment cannot be processed')
    }
  }
}
