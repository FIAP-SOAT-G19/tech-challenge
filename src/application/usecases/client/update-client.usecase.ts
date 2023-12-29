import { ISchemaValidator, IClientRepository } from '@/application/interfaces'
import { IUpdateClientUseCase } from '@/application/interfaces/usecases/client/update-client.interface'
import { MissingParamError, InvalidParamError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

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

    if (input.email) {
      const clientEmail = await this.clientRepository.getByEmail(input.email)
      if (clientEmail && clientEmail.id !== input.id) throw new InvalidParamError('the email is already being used by another user')
    }

    if (input.cpf) {
      const clientDocument = await this.clientRepository.getByDocument(input.cpf)
      if (clientDocument && clientDocument.id !== input.id) throw new InvalidParamError('there is already a user with this document')
    }

    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.UPDATE_CLIENT,
      data: { name: input.name, email: input.email, cpf: input.cpf }
    })
    if (validation?.error) {
      throw new InvalidParamError(validation.error)
    }
  }
}
