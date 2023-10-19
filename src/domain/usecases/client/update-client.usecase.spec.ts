import { Client, IClientRepository, ISchemaValidator } from '@/ports'
import { IUpdateClientUseCase } from '@/ports/usecases/client/update-client.port'
import { IEncrypt } from '@/ports/usecases/encrypt/encrypt.port'
import { InvalidParamError } from '@/shared/errors'
import { UpdateClientUseCase } from '@/domain/usecases/client/update-client.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const schemaValidator = mock<ISchemaValidator>()
const clientRepository = mock<IClientRepository>()
const encrypt = mock<IEncrypt>()

describe('UpdateClientUseCase', () => {
  let sut: IUpdateClientUseCase
  let input: IUpdateClientUseCase.Input
  let clientRepositoryOutput: Client

  beforeEach(() => {
    sut = new UpdateClientUseCase(schemaValidator, clientRepository, encrypt)
    input = {
      id: 'anyClientId',
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
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    await sut.execute(input)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'clientSchema', data: input })
    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
  })

  test('should throws if id is empty', async () => {
    input.id = ''
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'id' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('id'))
  })

  test('should throws if name is empty', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    input.name = ''
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

  test('should throws if password and repeatPassword are different', async () => {
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if id not exists', async () => {
    clientRepository.getById.mockReset()
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: undefined })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('id'))
  })

  test('should call encrypt once with correct values', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    await sut.execute(input)
    expect(encrypt.encrypt).toHaveBeenCalledWith(input.password)
    expect(encrypt.encrypt).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository.update with correct values', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    encrypt.encrypt.mockReturnValueOnce('anyEncrypt')
    await sut.execute(input)
    expect(clientRepository.update).toHaveBeenCalledWith({
      ...input,
      id: 'anyClientId',
      password: 'anyEncrypt',
      updatedAt: new Date()
    })
    expect(clientRepository.update).toHaveBeenCalledTimes(1)
  })
})
