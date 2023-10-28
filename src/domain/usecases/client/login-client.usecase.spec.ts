import { Client, IClientRepository } from '@/ports'
import { ILoginClientUseCase } from '@/ports/usecases/client/login-client.port'
import { LoginClientUseCase } from './login-client.usecase'
import { mock } from 'jest-mock-extended'
import { IEncrypt } from '@/ports/usecases/encrypt/encrypt.port'
import { InvalidParamError } from '@/shared'

const clientRepository = mock<IClientRepository>()
const encrypt = mock<IEncrypt>()

describe('LoginClientUseCase', () => {
  let sut: ILoginClientUseCase
  let input: ILoginClientUseCase.Input
  let clientRepositoryOutput: Client

  beforeEach(() => {
    sut = new LoginClientUseCase(clientRepository, encrypt)
    input = {
      email: 'anyClientEmail',
      password: 'anyClientPassword'
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

  test('should call clientRepository onde with correct values', async () => {
    encrypt.compare.mockResolvedValueOnce(true)
    clientRepository.getByEmail.mockResolvedValueOnce(clientRepositoryOutput)
    await sut.execute(input)
    expect(clientRepository.getByEmail).toHaveBeenCalledWith(input.email)
    expect(clientRepository.getByEmail).toHaveBeenCalledTimes(1)
  })

  test('should throws if email is invalid', async () => {
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('email or password is incorrect'))
  })

  test('should throws if password is invalid', async () => {
    clientRepository.getByEmail.mockResolvedValueOnce(clientRepositoryOutput)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('email or password is incorrect'))
  })

  test('should return Client with correct values', async () => {
    encrypt.compare.mockResolvedValueOnce(true)
    clientRepository.getByEmail.mockResolvedValueOnce(clientRepositoryOutput)
    const client = await sut.execute(input)
    expect(client).toEqual({ name: clientRepositoryOutput.name, email: clientRepositoryOutput.email, cpf: clientRepositoryOutput.cpf })
  })
})
