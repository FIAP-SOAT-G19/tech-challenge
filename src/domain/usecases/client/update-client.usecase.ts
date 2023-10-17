import { IClientRepository, ISchemaValidator } from '@/ports'
import { IUpdateClientUseCase } from '@/ports/usecases/client/update-client.port'
import { IEncrypt } from '@/ports/usecases/encrypt/encrypt.port'
import constants from '@/shared/constants'
import { InvalidParamError } from '@/shared/errors'

export class UpdateClientUseCase implements IUpdateClientUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly clientRepository: IClientRepository,
    private readonly encrypt: IEncrypt
  ) { }

  async execute(input: IUpdateClientUseCase.Input): Promise<string> {
    await this.validate(input)
    return await this.clientRepository.update({
      ...input,
      password: this.encrypt.encrypt(input.password),
      updatedAt: new Date()
    })
  }

  private async validate(input: IUpdateClientUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({ schema: constants.SCHEMAS.CLIENT, data: input })
    if (validation?.error) {
      throw new InvalidParamError(validation.error)
    }

    const client = await this.clientRepository.getById(input.id)
    if (!client) throw new InvalidParamError('id')
  }
}
