import { Client } from '@/application/interfaces'
import { ILoginClientUseCase } from '@/application/interfaces/usecases/client/login-client.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError } from '@/infra/shared'
import { LoginClientUseCase } from './login-client.usecase'
import { mock } from 'jest-mock-extended'
import { ILoginClientGateway } from '@/application/interfaces/gateways/client/login-client-gateway.interface'

const gateway = mock<ILoginClientGateway>()
const encrypt = mock<IEncrypt>()

describe('LoginClientUseCase', () => {
  let sut: ILoginClientUseCase
  let input: ILoginClientUseCase.Input
  let loginClientGatewayOutput: Client

  beforeEach(() => {
    sut = new LoginClientUseCase(gateway, encrypt)
    input = {
      email: 'anyClientEmail',
      password: 'anyClientPassword'
    }
    loginClientGatewayOutput = {
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

  test('should call clientRepository onde with correct values', async () => {
    encrypt.compare.mockResolvedValueOnce(true)
    gateway.getClientByEmail.mockResolvedValueOnce(loginClientGatewayOutput)
    await sut.execute(input)
    expect(gateway.getClientByEmail).toHaveBeenCalledWith(input.email)
    expect(gateway.getClientByEmail).toHaveBeenCalledTimes(1)
  })

  test('should throws if email is invalid', async () => {
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('email or password is incorrect'))
  })

  test('should throws if password is invalid', async () => {
    gateway.getClientByEmail.mockResolvedValueOnce(loginClientGatewayOutput)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('email or password is incorrect'))
  })

  test('should return Client with correct values', async () => {
    encrypt.compare.mockResolvedValueOnce(true)
    gateway.getClientByEmail.mockResolvedValueOnce(loginClientGatewayOutput)
    const client = await sut.execute(input)
    expect(client).toEqual({ name: loginClientGatewayOutput.name, email: loginClientGatewayOutput.email, cpf: loginClientGatewayOutput.cpf })
  })
})
