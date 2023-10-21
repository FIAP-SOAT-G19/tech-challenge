import { HttpRequest } from '@/shared/types/http.types'
import { GetClientByIdController } from './get-client-by-id.controller'
import { IGetClientByIdUseCase } from '@/ports/usecases/client/get-client-by-id.port'
import { mock } from 'jest-mock-extended'
import { serverError } from '@/shared/helpers/http.helper'

const getClientByIdUseCase = mock<IGetClientByIdUseCase>()

describe('GetClientByIdController', () => {
  let sut: GetClientByIdController
  let input: HttpRequest
  let getClientByIdUseCaseOutput: IGetClientByIdUseCase.Output

  beforeEach(() => {
    sut = new GetClientByIdController(getClientByIdUseCase)
    input = {
      params: {
        id: 'anyClientId'
      }
    }
    getClientByIdUseCaseOutput = {
      id: 'anyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    }
  })

  test('Should call GetClientByIdUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(getClientByIdUseCase.execute).toHaveBeenCalledWith(input.params)
    expect(getClientByIdUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('Should return client on sucsess', async () => {
    getClientByIdUseCase.execute.mockResolvedValueOnce(getClientByIdUseCaseOutput)
    const output = await sut.execute(input)
    expect(output).toMatchObject({ statusCode: 200, body: { client: getClientByIdUseCaseOutput } })
  })

  test('should return an error if GetClientByIdUseCase throws', async () => {
    const error = new Error('Internal server error')
    getClientByIdUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
