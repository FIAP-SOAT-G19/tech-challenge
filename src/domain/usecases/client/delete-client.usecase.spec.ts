import { Client, IClientRepository } from '@/ports'
import { IDeleteClientUseCase } from '@/ports/usecases/client/delete-client.por'
import { ClientNotFoundError } from '@/shared/errors'
import { mock } from 'jest-mock-extended'
import { DeleteClientUseCase } from './delete-client.usecase'

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

  test('should returns id on success', async () => {
    clientRepository.getById.mockResolvedValueOnce(clientRepositoryOutput)
    clientRepository.delete.mockResolvedValueOnce(clientRepositoryOutput.id)
    const output = await sut.execute(input)
    expect(output).toEqual(clientRepositoryOutput.id)
  })
})
