import { ISchemaValidator, IUUIDGenerator, ICreateClientGateway } from '@/application/interfaces'
import { ICreateClientUseCase } from '@/application/interfaces/usecases/client/create-client.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class CreateClientUseCase implements ICreateClientUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly gateway: ICreateClientGateway,
    private readonly encrypt: IEncrypt
  ) { }

  async execute(input: ICreateClientUseCase.Input): Promise<ICreateClientUseCase.Output> {
    await this.validate(input)
    return this.gateway.saveClient({
      ...input,
      id: this.uuidGenerator.generate(),
      password: this.encrypt.encrypt(input.password),
      createdAt: new Date()
    })
  }

  private async validate(input: ICreateClientUseCase.Input): Promise<void> {
    const clientEmail = await this.gateway.getClientByEmail(input.email)
    if (clientEmail) throw new InvalidParamError('email')

    const clientDocument = await this.gateway.getClientByDocument(input.cpf)
    if (clientDocument) throw new InvalidParamError('document')

    const validation = this.schemaValidator.validate({ schema: constants.SCHEMAS.CLIENT, data: input })
    if (validation?.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}
