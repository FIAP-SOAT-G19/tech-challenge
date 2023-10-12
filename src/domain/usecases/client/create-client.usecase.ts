import { IClientRepository } from '@/ports/repositories/client.port'
import { ICreateClientUseCase } from '@/ports/usecases/client/create-client.port'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import constants from '@/shared/constants'
import { InvalidParamError } from '@/shared/errors'

export class CreateClientUseCase implements ICreateClientUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly clientRepository: IClientRepository
  ) { }

  async execute(input: ICreateClientUseCase.Input): Promise<ICreateClientUseCase.Output> {
    await this.validate(input)
    return ''
  }

  private async validate(input: ICreateClientUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.CLIENT,
      data: input
    })

    if (validation?.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}
