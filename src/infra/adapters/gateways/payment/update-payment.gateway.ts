import { IOrderRepository, IPaymentRepository } from '@/application/interfaces'
import { IUpdatePaymentGateway } from '@/application/interfaces/gateways/payment/update-payment-gateway.interface'
import { IUpdatePaymentStatus } from '@/application/interfaces/usecases/payment/update-payment-status.interface'
import { OrderOutput } from '@/application/usecases/order/orders.types'

export class UpdatePaymentStatusGateway implements IUpdatePaymentGateway {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly orderRepository: IOrderRepository
  ) {}

  async updateStatus (input: IUpdatePaymentStatus.Input): Promise<void> {
    await this.paymentRepository.updateStatus(input)
  }

  async getByOrderNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }
}
