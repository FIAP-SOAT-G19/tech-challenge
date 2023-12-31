import { UpdateClientUseCase } from '@/application/usecases/client/update-client.usecase'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeUpdateClientUseCase = (): UpdateClientUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const clientRepository = new ClientRepository()

  return new UpdateClientUseCase(schemaValidator, clientRepository)
}
