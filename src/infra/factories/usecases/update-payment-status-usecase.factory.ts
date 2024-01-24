import { UpdatePaymentStatusUseCase } from '@/application/usecases/payment/update.payment.usecase'
import { UpdatePaymentStatusGateway } from '@/infra/adapters/gateways/payment/update-payment.gateway'
import { OrderRepository } from '@/infra/database/repositories/order.repository'
import { PaymentRepository } from '@/infra/database/repositories/payment.repository'

export const makeUpdatePaymentStatusUseCase = (): UpdatePaymentStatusUseCase => {
  const paymentRepository = new PaymentRepository()
  const orderRepository = new OrderRepository()
  const gateway = new UpdatePaymentStatusGateway(paymentRepository, orderRepository)
  return new UpdatePaymentStatusUseCase(gateway)
}
