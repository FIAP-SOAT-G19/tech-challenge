import { CreateClientUseCase } from '@/application/usecases/client/create-client.usecase'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeCreateClientUseCase = (): CreateClientUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const clientRepository = new ClientRepository()
  const encrypt = new BcryptAdapter()

  return new CreateClientUseCase(schemaValidator, uuidGenerator, clientRepository, encrypt)
}
