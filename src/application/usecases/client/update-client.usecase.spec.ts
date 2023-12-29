import { Client, IClientRepository, ISchemaValidator } from '@/application/interfaces'
import { IUpdateClientUseCase } from '@/application/interfaces/usecases/client/update-client.interface'
import { InvalidParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { UpdateClientUseCase } from './update-client.usecase'

const schemaValidator = mock<ISchemaValidator>()
const clientRepository = mock<IClientRepository>()

describe('UpdateClientUseCase', () => {
  let sut: IUpdateClientUseCase
  let input: IUpdateClientUseCase.Input
  let clientRepositoryOutput: Client

  beforeEach(() => {
    sut = new UpdateClientUseCase(schemaValidator, clientRepository)
    input = {
      id: 'anyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    }
    clientRepositoryOutput = {
      id: 'otherAnyClientId',
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
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'updateClientSchema', data: { name: input.name, email: input.email, cpf: input.cpf } })
    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
  })

  test('should throws if id is empty', async () => {
    input.id = ''
    clientRepository.getById.mockResolvedValueOnce(null)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('id'))
  })

  test('should throws if email is empty', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    input.email = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if cpf is empty', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    clientRepository.getByEmail.mockResolvedValueOnce(null)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    input.cpf = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if schemaValidator returns error', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    clientRepository.getByEmail.mockResolvedValueOnce(null)
    clientRepository.getByDocument.mockResolvedValueOnce(null)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should call clientRepository.update with correct values', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    clientRepository.getByEmail.mockResolvedValueOnce(null)
    clientRepository.getByDocument.mockResolvedValueOnce(null)
    await sut.execute(input)
    expect(clientRepository.update).toHaveBeenCalledWith({ ...input, id: 'anyClientId', updatedAt: new Date() })
    expect(clientRepository.update).toHaveBeenCalledTimes(1)
  })
})
