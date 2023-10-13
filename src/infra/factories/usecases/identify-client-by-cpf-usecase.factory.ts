import { IdentifyClientByCpfUseCase } from '../../../domain/usecases/client/identify-client-by-cpf.usecase'
// import { UUIDGeneratorAdapter } from '../../adapters/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '../../adapters/validation/joi-validator.adapter'
import { ClientRepository } from '../../database/repositories/client.repository'

export const makeCreateOrderUseCase = (): IdentifyClientByCpfUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  // const uuidGenerator = new UUIDGeneratorAdapter()
  const clientRepository = new ClientRepository()

  return new IdentifyClientByCpfUseCase(
    schemaValidator,
    // uuidGenerator,
    clientRepository
  )
}
