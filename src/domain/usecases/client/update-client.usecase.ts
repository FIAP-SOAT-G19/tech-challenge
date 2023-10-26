import { IClientRepository, ISchemaValidator } from '@/ports'
import { IUpdateClientUseCase } from '@/ports/usecases/client/update-client.port'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import constants from '@/shared/constants'

export class UpdateClientUseCase implements IUpdateClientUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly clientRepository: IClientRepository
  ) { }

  async execute(input: IUpdateClientUseCase.Input): Promise<string> {
    await this.validate(input)
    return await this.clientRepository.update({ ...input, updatedAt: new Date() })
  }

  private async validate(input: IUpdateClientUseCase.Input): Promise<void> {
    if (!input.name && !input.email && !input.cpf) throw new MissingParamError('enter at least one parameter name, email or document')
    const client = await this.clientRepository.getById(input.id)
    if (!client) throw new InvalidParamError('id')

    const clientEmail = await this.clientRepository.getByEmail(input.email)
    if (clientEmail && clientEmail.id !== input.id) throw new InvalidParamError('the email is already being used by another user')

    const clientDocument = await this.clientRepository.getByDocument(input.cpf)
    if (clientDocument && clientDocument.id !== input.id) throw new InvalidParamError('there is already a user with this document')

    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.UPDATE_CLIENT,
      data: { name: input.name, email: input.email, cpf: input.cpf }
    })
    if (validation?.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}
