import { IGetAllClientsUseCase } from '@/ports/usecases/client/get-all-clients.port'
import { GetAllClientsUseCase } from './get-all-clients.usecase'
import { Client, IClientRepository } from '@/ports'
import { mock } from 'jest-mock-extended'
import { ClientNotFoundError } from '@/shared/errors'

const clientRepository = mock<IClientRepository>()

describe('GetClientByIdUseCase', () => {
  let sut: IGetAllClientsUseCase
  let input: IGetAllClientsUseCase.Input
  let clientRepositoryOutput: Client[]

  beforeEach(() => {
    sut = new GetAllClientsUseCase(clientRepository)
    input = {
      id: 'anyClientId',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    }
    clientRepositoryOutput = [{
      id: 'anyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      password: 'anyClientPassword',
      cpf: 'anyClientCpf',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }]
  })

  test('should call clientRepository with correct values', async () => {
    clientRepository.getAll.mockResolvedValueOnce(clientRepositoryOutput)
    input.cpf = ''
    input.email = ''
    await sut.execute(input)
    expect(clientRepository.getAll).toHaveBeenCalledWith({ id: input.id })
    expect(clientRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository with correct values', async () => {
    clientRepository.getAll.mockResolvedValueOnce(clientRepositoryOutput)
    input.id = ''
    input.cpf = ''
    await sut.execute(input)
    expect(clientRepository.getAll).toHaveBeenCalledWith({ email: input.email })
    expect(clientRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository with correct values', async () => {
    clientRepository.getAll.mockResolvedValueOnce(clientRepositoryOutput)
    input.id = ''
    input.email = ''
    await sut.execute(input)
    expect(clientRepository.getAll).toHaveBeenCalledWith({ cpf: input.cpf })
    expect(clientRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository returns correct values', async () => {
    clientRepository.getAll.mockResolvedValueOnce(clientRepositoryOutput)
    const output = await sut.execute(input)
    expect(output).toMatchObject(clientRepositoryOutput)
  })

  test('should throws if clientId not exists', async () => {
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new ClientNotFoundError())
  })
})
