import { UpdateClientUseCase } from '@/domain/usecases/client/update-client.usecase'
import { BcryptAdapter } from '@/infra/adapters/encrypt/bcrypt.adapter'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/validation/joi-validator.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeUpdateClientUseCase = (): UpdateClientUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const clientRepository = new ClientRepository()
  const encrypt = new BcryptAdapter()

  return new UpdateClientUseCase(schemaValidator, clientRepository, encrypt)
}
