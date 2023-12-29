import { ILoginClientUseCase } from '@/application/interfaces/usecases/client/login-client.interface'
import { HttpRequest, serverError } from '@/infra/shared'
import { LoginClientController } from './login-client.controller'
import { mock } from 'jest-mock-extended'

const loginClientUseCase = mock<ILoginClientUseCase>()

describe('LoginClientController', () => {
  let sut: LoginClientController
  let input: HttpRequest
  let loginClientUseCaseOutput: ILoginClientUseCase.Output

  beforeEach(() => {
    sut = new LoginClientController(loginClientUseCase)
    input = {
      body: {
        email: 'anyClientEmail',
        password: 'anyClientPassword'
      }
    }
    loginClientUseCaseOutput = {
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    }
  })

  test('should call LoginClientUseCase onde and with correct values', async () => {
    await sut.execute(input)
    expect(loginClientUseCase.execute).toHaveBeenCalledWith(input.body)
    expect(loginClientUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a Client on success', async () => {
    loginClientUseCase.execute.mockResolvedValueOnce({ ...loginClientUseCaseOutput })
    const output = await sut.execute(input.body)
    expect(output).toEqual({ statusCode: 200, body: { ...loginClientUseCaseOutput } })
  })

  test('shoudl return an error if LoginClientUseCase throws', async () => {
    const error = new Error('Internal server error')
    loginClientUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input.body)
    expect(output).toEqual(serverError(error))
  })
})
