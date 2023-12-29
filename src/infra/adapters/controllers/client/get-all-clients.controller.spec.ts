import { GetAllClientsController } from './get-all-clients.controller'
import { IGetAllClientsUseCase } from '@/application/interfaces/usecases/client/get-all-clients.interface'
import { HttpRequest, serverError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'

const getClientByIdUseCase = mock<IGetAllClientsUseCase>()

describe('GetClientByIdController', () => {
  let sut: GetAllClientsController
  let input: HttpRequest
  let getAllClientsUseCaseOutput: IGetAllClientsUseCase.Output[]

  beforeEach(() => {
    sut = new GetAllClientsController(getClientByIdUseCase)
    input = {
      query: {
        id: 'anyClientId'
      }
    }
    getAllClientsUseCaseOutput = [{
      id: 'anyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    }]
  })

  test('Should call GetClientByIdUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(getClientByIdUseCase.execute).toHaveBeenCalledWith(input.query)
    expect(getClientByIdUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('Should return client on sucsess', async () => {
    getClientByIdUseCase.execute.mockResolvedValueOnce(getAllClientsUseCaseOutput)
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: getAllClientsUseCaseOutput })
  })

  test('should return an error if GetClientByIdUseCase throws', async () => {
    const error = new Error('Internal server error')
    getClientByIdUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
