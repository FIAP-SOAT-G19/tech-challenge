import { ICreateClientUseCase } from '@/ports/usecases/client/create-client.port'
import { CreateClientUseCase } from '@/domain/usecases/client/create-client.usecase'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import { mock } from 'jest-mock-extended'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { IClientRepository } from '@/ports/repositories/client.port'

const schemaValidator = mock<ISchemaValidator>()
const uuidGenerator = mock<IUUIDGenerator>()
const clientRepository = mock<IClientRepository>()

describe('CreateClientUseCase', () => {
  let sut: ICreateClientUseCase
  let input: ICreateClientUseCase.Input

  beforeEach(() => {
    sut = new CreateClientUseCase(schemaValidator, uuidGenerator, clientRepository)
    input = {
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf',
      password: 'anyClientPassword',
      repeatPassword: 'anyClientRepeatPassword'
    }
  })

  beforeAll(() => {

  })

  test('should call schemaValidator once with correct values', async () => {
    await sut.execute(input)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'clientSchema', data: input })
    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
  })
})
