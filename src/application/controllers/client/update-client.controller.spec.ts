import { serverError } from '@/shared/helpers/http.helper'
import { HttpRequest } from '@/shared/types/http.types'
import { IUpdateClientUseCase } from '@/ports/usecases/client/update-client.port'
import { UpdateClientController } from '@/application/controllers/client/update-client.controller'
import { mock } from 'jest-mock-extended'

const updateClientUseCase = mock<IUpdateClientUseCase>()

describe('UpdateClientController', () => {
  let sut: UpdateClientController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateClientController(updateClientUseCase)
    input = {
      body: {
        id: 'anyClientId',
        name: 'anyClientName',
        email: 'anyClientEmail',
        cpf: 'anyClientCpf',
        password: 'anyClientPassword',
        repeatPassword: 'anyClientRepeatPassword'
      }
    }
  })

  test('should call UpdateClientUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(updateClientUseCase.execute).toHaveBeenCalledWith(input.body)
    expect(updateClientUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a clientId on success', async () => {
    updateClientUseCase.execute.mockResolvedValueOnce('anyClientId')
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: { clientId: 'anyClientId' } })
  })

  test('should return an error if updateClientUseCase throws', async () => {
    const error = new Error('Internal server error')
    updateClientUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
