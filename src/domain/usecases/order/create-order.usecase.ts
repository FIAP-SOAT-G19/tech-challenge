import { IClientRepository } from '@/ports/repositories/client.port'
import { IOrderRepository } from '@/ports/repositories/order.port'
import { ICreateOrderUseCase } from '@/ports/usecases/order/create-order.port'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { InvalidParamError } from '@/shared/errors'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import constants from '@/shared/constants'
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly clientRepository: IClientRepository,
    private readonly orderRepository: IOrderRepository
  ) {}

  async execute (input: ICreateOrderUseCase.Input): Promise<ICreateOrderUseCase.Output> {
    await this.validate(input)

    return await this.orderRepository.save({
      id: this.uuidGenerator.generate(),
      clientId: input.clientId ?? null,
      status: constants.ORDER_STATUS.WAITING_PAYMENT,
      totalValue: input.totalValue,
      createdAt: new Date()
    })
  }

  private async validate (input: ICreateOrderUseCase.Input): Promise<void> {
    if (input.clientId) {
      const client = await this.clientRepository.getById(input.clientId)
      if (!client) {
        throw new InvalidParamError('clientId')
      }
    }

    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.ORDER,
      data: input
    })

    if (validation.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}
