import { GetClientByIdUseCase } from '@/domain/usecases/client/get-client-by-id.usecase'
import { IGetClientById } from '@/ports/usecases/client/get-client-by-id.port'
import { ClientNotFoundError } from '@/shared/errors'
import { IClientRepository, Client } from '@/ports'
import { mock } from 'jest-mock-extended'

const clientRepository = mock<IClientRepository>()

describe('GetClientByIdUseCase', () => {
  let sut: IGetClientById
  let input: IGetClientById.Input
  let clientRepositoryOutput: Client

  beforeEach(() => {
    sut = new GetClientByIdUseCase(clientRepository)
    input = {
      id: 'anyClientId'
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

  test('should call clientRepository with correct values', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    await sut.execute(input)
    expect(clientRepository.getById).toHaveBeenCalledWith(input.id)
    expect(clientRepository.getById).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository returns correct values', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    const output = await sut.execute(input)
    expect(output).toMatchObject(clientRepositoryOutput)
  })

  test('should throws if clientId not exists', async () => {
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new ClientNotFoundError())
  })
})
