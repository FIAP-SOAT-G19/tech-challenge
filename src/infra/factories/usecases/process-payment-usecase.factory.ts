import { ProcessPaymentUseCase } from '@/application/usecases/payment/process.payment.usecase'
import { ProcessPaymentGateway } from '@/infra/adapters/gateways/payment/process-payment.gateway'
import { CardValidtorAdapter } from '@/infra/adapters/tools/validation/card-validator.adapter'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { OrderRepository } from '@/infra/database/repositories/order.repository'
import { PaymentRepository } from '@/infra/database/repositories/payment.repository'
import { ExternalProcessPayment } from '@/infra/external/payment/fake-payment-gateway'

export const makeProcessPaymentUseCase = (): ProcessPaymentUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const cardValidator = new CardValidtorAdapter()
  const gateway = new ProcessPaymentGateway(
    new ExternalProcessPayment(),
    new OrderRepository(),
    new PaymentRepository()
  )

  return new ProcessPaymentUseCase(schemaValidator, cardValidator, gateway)
}
