import { mock } from 'jest-mock-extended'
import { DeleteClientUseCase } from './delete-client.usecase'
import { Client } from '@/application/interfaces'
import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { ClientNotFoundError } from '@/infra/shared'
import { IDeleteClientGateway } from '@/application/interfaces/gateways/client/delete-client-gateway.interface'

const gateway = mock<IDeleteClientGateway>()

describe('DeleteClientUseCase', () => {
  let sut: IDeleteClientUseCase
  let input: IDeleteClientUseCase.Input
  let clientGatewayOutput: Client

  beforeEach(() => {
    sut = new DeleteClientUseCase(gateway)
    input = {
      id: 'anyClientId'
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

  test('should throws if id is empty', async () => {
    input.id = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new ClientNotFoundError())
  })

  test('should call clientRepository.delete with correct values', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    await sut.execute(input)
    expect(gateway.deleteClient).toHaveBeenCalledWith(input.id)
    expect(gateway.deleteClient).toHaveBeenCalledTimes(1)
  })

  test('should rethrows if throws', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    gateway.deleteClient.mockRejectedValueOnce(new Error())
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new Error())
  })
})
