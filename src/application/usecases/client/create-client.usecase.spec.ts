
import { ISchemaValidator, IUUIDGenerator, Client, ICreateClientGateway } from '@/application/interfaces'
import { ICreateClientUseCase } from '@/application/interfaces/usecases/client/create-client.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { CreateClientUseCase } from './create-client.usecase'

const schemaValidator = mock<ISchemaValidator>()
const uuidGenerator = mock<IUUIDGenerator>()
const gateway = mock<ICreateClientGateway>()
const encrypt = mock<IEncrypt>()

describe('CreateClientUseCase', () => {
  let sut: ICreateClientUseCase
  let input: ICreateClientUseCase.Input
  let clientGatewayOutput: Client

  beforeEach(() => {
    sut = new CreateClientUseCase(schemaValidator, uuidGenerator, gateway, encrypt)
    input = {
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf',
      password: 'anyClientPassword',
      repeatPassword: 'anyClientRepeatPassword'
    }

    clientGatewayOutput = {
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
    gateway.getClientByEmail.mockResolvedValueOnce(clientGatewayOutput)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('email'))
  })

  test('should throws if document already exists', async () => {
    gateway.getClientByDocument.mockResolvedValueOnce(clientGatewayOutput)
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
    expect(gateway.saveClient).toHaveBeenCalledWith({
      ...input,
      id: 'anyUuid',
      password: 'anyEncrypt',
      createdAt: new Date()
    })
    expect(gateway.saveClient).toHaveBeenCalledTimes(1)
  })
})
