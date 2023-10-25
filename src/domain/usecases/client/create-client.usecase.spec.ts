import { ICreateClientUseCase } from '@/ports/usecases/client/create-client.port'
import { CreateClientUseCase } from '@/domain/usecases/client/create-client.usecase'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import { mock } from 'jest-mock-extended'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { Client, IClientRepository } from '@/ports/repositories/client.port'
import { InvalidParamError } from '@/shared/errors'
import { IEncrypt } from '@/ports/usecases/encrypt/encrypt.port'
import MockDate from 'mockdate'

const schemaValidator = mock<ISchemaValidator>()
const uuidGenerator = mock<IUUIDGenerator>()
const clientRepository = mock<IClientRepository>()
const encrypt = mock<IEncrypt>()

describe('CreateClientUseCase', () => {
  let sut: ICreateClientUseCase
  let input: ICreateClientUseCase.Input
  let clientRepositoryOutput: Client

  beforeEach(() => {
    sut = new CreateClientUseCase(schemaValidator, uuidGenerator, clientRepository, encrypt)
    input = {
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf',
      password: 'anyClientPassword',
      repeatPassword: 'anyClientRepeatPassword'
    }

    clientRepositoryOutput = {
      id: 'anyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      password: 'anyClientPassword',
      cpf: 'anyClientCpf',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
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

  test('should throws if email already exists', async () => {
    clientRepository.getByEmail.mockResolvedValueOnce(clientRepositoryOutput)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('email'))
  })

  test('should throws if document already exists', async () => {
    clientRepository.getByDocument.mockResolvedValueOnce(clientRepositoryOutput)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('document'))
  })

  test('should call encrypt once with correct values', async () => {
    await sut.execute(input)
    expect(encrypt.encrypt).toHaveBeenCalledWith(input.password)
    expect(encrypt.encrypt).toHaveBeenCalledTimes(1)
  })

  test('should call uuidGenerator once with correct values', async () => {
    await sut.execute(input)
    expect(uuidGenerator.generate).toHaveBeenCalledWith()
    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository.save with correct values', async () => {
    uuidGenerator.generate.mockReturnValueOnce('anyUuid')
    encrypt.encrypt.mockReturnValueOnce('anyEncrypt')
    await sut.execute(input)
    expect(clientRepository.save).toHaveBeenCalledWith({
      ...input,
      id: 'anyUuid',
      password: 'anyEncrypt',
      createdAt: new Date()
    })
    expect(clientRepository.save).toHaveBeenCalledTimes(1)
  })
})