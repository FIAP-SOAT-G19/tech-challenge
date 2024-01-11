import { Client } from '@/application/interfaces'
import { GetAllClientsUseCase } from './get-all-clients.usecase'
import { IGetAllClientsUseCase } from '@/application/interfaces/usecases/client/get-all-clients.interface'
import { mock } from 'jest-mock-extended'
import { ClientNotFoundError } from '@/infra/shared'
import { IGetAllClientsByParamsGateway } from '@/application/interfaces/gateways/client/get-all-clientes-gateway.interface'

const gateway = mock<IGetAllClientsByParamsGateway>()

describe('GetAllClientsByParamsUseCase', () => {
  let sut: IGetAllClientsUseCase
  let input: IGetAllClientsUseCase.Input
  let getAllClientsOutput: Client[]

  beforeEach(() => {
    sut = new GetAllClientsUseCase(gateway)
    input = {
      id: 'anyClientId',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    }
    getAllClientsOutput = [{
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
    gateway.getAllClientsByParams.mockResolvedValueOnce(getAllClientsOutput)
    input.cpf = ''
    input.email = ''
    await sut.execute(input)
    expect(gateway.getAllClientsByParams).toHaveBeenCalledWith({ id: input.id })
    expect(gateway.getAllClientsByParams).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository with correct values', async () => {
    gateway.getAllClientsByParams.mockResolvedValueOnce(getAllClientsOutput)
    input.id = ''
    input.cpf = ''
    await sut.execute(input)
    expect(gateway.getAllClientsByParams).toHaveBeenCalledWith({ email: input.email })
    expect(gateway.getAllClientsByParams).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository with correct values', async () => {
    gateway.getAllClientsByParams.mockResolvedValueOnce(getAllClientsOutput)
    input.id = ''
    input.email = ''
    await sut.execute(input)
    expect(gateway.getAllClientsByParams).toHaveBeenCalledWith({ cpf: input.cpf })
    expect(gateway.getAllClientsByParams).toHaveBeenCalledTimes(1)
  })

  test('should call clientRepository returns correct values', async () => {
    gateway.getAllClientsByParams.mockResolvedValueOnce(getAllClientsOutput)
    const output = await sut.execute(input)
    expect(output).toMatchObject(getAllClientsOutput)
  })

  test('should throws if clientId not exists', async () => {
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new ClientNotFoundError())
  })
})
