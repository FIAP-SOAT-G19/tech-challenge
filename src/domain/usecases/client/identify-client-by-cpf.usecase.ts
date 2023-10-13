import { Client, IClientRepository, ISchemaValidator } from '@/ports/'
import { InvalidParamError } from '../../../shared/errors'
import { IIdentifyClientByCpfUseCase } from '@/ports/usecases/client/identify-client-by-cpf.port'
import constants from '../../../shared/constants'

export class IdentifyClientByCpfUseCase implements IIdentifyClientByCpfUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly clientRepository: IClientRepository
  ) {}

  async execute (input: IIdentifyClientByCpfUseCase.Input): Promise<IIdentifyClientByCpfUseCase.Output> {
    await this.validate(input)

    const client = await this.getClientByCpf(input.cpf)

    return client

    // if (!client) create
  }

  private async validate (input: IIdentifyClientByCpfUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.GET_CLIENT_BY_CPF,
      data: input
    })

    if (validation.error) throw new InvalidParamError(validation.error)
  }

  async getClientByCpf(cpf: string): Promise<Client | null> {
    const client = await this.clientRepository.getById(cpf)

    if (!client) return null

    return client
  }
}
