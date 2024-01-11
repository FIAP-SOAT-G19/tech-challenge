import { IOrderRepository, IPaymentRepository, UpdateOrderStatusInput } from '@/application/interfaces'
import { IExternalPayment } from '@/application/interfaces/external/payment/external-payment.interface'
import { IPaymentGateway, ProcessPaymentInput } from '@/application/interfaces/gateways/payment/process-payment-gateway.interface'
import { IUpdatePaymentStatus } from '@/application/interfaces/usecases/payment/update-payment-status.interface'
import { OrderOutput } from '@/application/usecases/order/orders.types'

export class ProcessPaymentGateway implements IPaymentGateway {
  constructor(
    private readonly externalPayment: IExternalPayment,
    private readonly orderRepository: IOrderRepository,
    private readonly paymentRepository: IPaymentRepository
  ) {}

  async processPayment (input: ProcessPaymentInput): Promise<void> {
    await this.externalPayment.processPayment(input)
  }

  async updateOrderStatus (input: UpdateOrderStatusInput): Promise<void> {
    await this.orderRepository.updateStatus(input)
  }

  async getByOrderNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }

  async updateStatus (input: IUpdatePaymentStatus.Input): Promise<void> {
    await this.paymentRepository.updateStatus(input)
  }

  async countPaymentByStatusAndOrderNumber (status: string, orderNumber: string): Promise<number> {
    return this.paymentRepository.countPaymentByStatusAndOrderNumber(status, orderNumber)
  }
}
