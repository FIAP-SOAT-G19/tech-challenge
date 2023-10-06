import { ICreateOrderUseCase } from '@/ports/usecases/order/create-order-usecase.port'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly uuidGenerator: IUUIDGenerator
  ) {}

  async execute (input: ICreateOrderUseCase.Input): Promise<ICreateOrderUseCase.Output> {
    this.uuidGenerator.generate()
    return ''
  }
}
