import { mock } from 'jest-mock-extended'
import { DeleteClientUseCase } from './delete-client.usecase'
import { Client, IClientRepository } from '@/application/interfaces'
import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { ClientNotFoundError } from '@/infra/shared'

const clientRepository = mock<IClientRepository>()

describe('DeleteClientUseCase', () => {
  let sut: IDeleteClientUseCase
  let input: IDeleteClientUseCase.Input
  let clientRepositoryOutput: Client

  beforeEach(() => {
    sut = new DeleteClientUseCase(clientRepository)
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

  test('should throws if id is empty', async () => {
    input.id = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new ClientNotFoundError())
  })

  test('should call clientRepository.delete with correct values', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    await sut.execute(input)
    expect(clientRepository.delete).toHaveBeenCalledWith(input.id)
    expect(clientRepository.delete).toHaveBeenCalledTimes(1)
  })

  test('should rethrows if throws', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    clientRepository.delete.mockRejectedValueOnce(new Error())
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new Error())
  })
})
