import { Client, IClientRepository, ISchemaValidator } from '@/ports'
import { IUpdateClientUseCase } from '@/ports/usecases/client/update-client.port'
import { InvalidParamError } from '@/shared/errors'
import { UpdateClientUseCase } from '@/domain/usecases/client/update-client.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

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
    clientRepository.getByEmail.mockResolvedValueOnce(clientRepositoryOutput)
    input.email = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('email'))
  })

  test('should throws if cpf is empty', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    clientRepository.getByEmail.mockResolvedValueOnce(null)
    clientRepository.getByDocument.mockResolvedValueOnce(clientRepositoryOutput)
    input.cpf = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('document'))
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
    await sut.execute(input)
    expect(clientRepository.update).toHaveBeenCalledWith({ ...input, id: 'anyClientId', updatedAt: new Date() })
    expect(clientRepository.update).toHaveBeenCalledTimes(1)
  })
})
