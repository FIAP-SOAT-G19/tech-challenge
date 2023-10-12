import { ICreateClientUseCase } from '@/ports/usecases/client/create-client.port'
import { CreateClientUseCase } from '@/domain/usecases/client/create-client.usecase'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import { mock } from 'jest-mock-extended'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { IClientRepository } from '@/ports/repositories/client.port'
import { InvalidParamError } from '@/shared/errors'

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

  test('should throws if name is empty', async () => {
    input.name = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if email is empty', async () => {
    input.email = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if cpf is empty', async () => {
    input.cpf = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if password is empty', async () => {
    input.password = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if repeatPassword is empty', async () => {
    input.repeatPassword = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if password and repeatPassword are different ', async () => {
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })
})
