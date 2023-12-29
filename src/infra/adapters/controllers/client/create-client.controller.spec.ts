import { ICreateClientUseCase } from '@/application/interfaces/usecases/client/create-client.interface'
import { HttpRequest, serverError } from '@/infra/shared'
import { CreateClientController } from './create-client.controller'
import { mock } from 'jest-mock-extended'

const createClientUseCase = mock<ICreateClientUseCase>()

describe('CreateClientController', () => {
  let sut: CreateClientController
  let input: HttpRequest

  beforeEach(() => {
    sut = new CreateClientController(createClientUseCase)
    input = {
      body: {
        name: 'anyClientName',
        email: 'anyClientEmail',
        cpf: 'anyClientCpf',
        password: 'anyClientPassword',
        repeatPassword: 'anyClientRepeatPassword'
      }
    }
  })

  test('should call CreateClientUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(createClientUseCase.execute).toHaveBeenCalledWith(input.body)
    expect(createClientUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a clientId on success', async () => {
    createClientUseCase.execute.mockResolvedValueOnce('anyClientId')
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 201, body: { clientId: 'anyClientId' } })
  })

  test('should return an error if CreateClientUseCase throws', async () => {
    const error = new Error('Internal server error')
    createClientUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
