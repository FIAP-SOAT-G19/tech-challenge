import { IOrderRepository } from '@/ports/repositories/order.port'
import { ICreateOrderUseCase } from '@/ports/usecases/order/create-order-usecase.port'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (input: ICreateOrderUseCase.Input): Promise<ICreateOrderUseCase.Output> {
    await this.orderRepository.save({
      id: this.uuidGenerator.generate(),
      clientId: input.clientId ?? null,
      totalValue: input.totalValue,
      paidAt: input.paidAt ?? null,
      createdAt: new Date()
    })

    return ''
  }
}
