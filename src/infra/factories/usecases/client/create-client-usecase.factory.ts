import { CreateClientUseCase } from '@/application/usecases/client/create-client.usecase'
import { CreateClientGateway } from '@/infra/adapters/gateways/client/create-client.gateway'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeCreateClientUseCase = (): CreateClientUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const gateway = new CreateClientGateway(new ClientRepository())
  const encrypt = new BcryptAdapter()

  return new CreateClientUseCase(schemaValidator, uuidGenerator, gateway, encrypt)
}
