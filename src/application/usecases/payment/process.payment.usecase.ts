import { IUUIDGenerator } from '@/application/interfaces'
import { IPaymentGateway } from '@/application/interfaces/gateways/payment/process-payment-gateway.interface'
import { IProcessPaymentUseCase } from '@/application/interfaces/usecases/payment/process-payment.interface'

export class ProcessPaymentUseCase implements IProcessPaymentUseCase {
  constructor(
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly gateway: IPaymentGateway
  ) {}

  async execute (input: IProcessPaymentUseCase.Input): Promise<IProcessPaymentUseCase.Output> {
    const { status, reason } = await this.gateway.processPayment(input)

    await this.gateway.createPaymentStatus({
      id: this.uuidGenerator.generate(),
      orderNumber: input.orderNumber,
      status,
      reason: reason ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await this.gateway.updateOrderStatus({
      orderNumber: input.orderNumber,
      status: status === 'approved' ? 'received' : 'canceled'
    })

    return {
      status,
      reason: reason ?? null
    }
  }
}
