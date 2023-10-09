import { IClientRepository, ISchemaValidator } from '@/ports/'
import { InvalidParamError } from '@/shared/errors'
import { Client } from '@/domain/types/clients.types'
import { IGetClientByCpfUseCase } from '@/ports/usecases/client/get-client-by-cpf.port'
import Joi from 'joi'

export class GetClientByCpfUseCase implements IGetClientByCpfUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly clientRepository: IClientRepository
  ) {}

  async execute (input: IGetClientByCpfUseCase.Input): Promise<IGetClientByCpfUseCase.Output> {
    await this.validate(input)

    const client = await this.getClientByCpf(input.cpf)

    return client
  }

  private async validate (input: IGetClientByCpfUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: Joi.object({
        cpf: Joi.string().length(11).required()
      }),
      data: input
    })

    if (validation.error) throw new InvalidParamError(validation.error)
  }

  async getClientByCpf(cpf: string): Promise<Client> {
    const client = await this.clientRepository.getById(cpf)

    if (!client) throw new InvalidParamError('cpf')

    return client
  }
}
