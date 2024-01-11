import { UpdateClientUseCase } from '@/application/usecases/client/update-client.usecase'
import { UpdateClientGateway } from '@/infra/adapters/gateways/client/update-client.gateway'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeUpdateClientUseCase = (): UpdateClientUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const gateway = new UpdateClientGateway(new ClientRepository())

  return new UpdateClientUseCase(schemaValidator, gateway)
}
