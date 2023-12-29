import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { HttpRequest, serverError } from '@/infra/shared'
import { DeleteClientController } from './delete-client.controller'
import { mock } from 'jest-mock-extended'

const deleteClientUseCase = mock<IDeleteClientUseCase>()

describe('DeleteClientController', () => {
  let sut: DeleteClientController
  let input: HttpRequest

  beforeEach(() => {
    sut = new DeleteClientController(deleteClientUseCase)
    input = {
      params: {
        id: 'anyClientId'
      }
    }
  })

  test('should call DeleteClientUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(deleteClientUseCase.execute).toHaveBeenCalledWith(input.params)
    expect(deleteClientUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a clientId on success', async () => {
    deleteClientUseCase.execute.mockResolvedValueOnce()
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: {} })
  })

  test('should return an error if DeleteClientUseCase throws', async () => {
    const error = new Error('Internal server error')
    deleteClientUseCase.execute.mockRejectedValueOnce(error)
    const output = await sut.execute(input)
    expect(output).toEqual(serverError(error))
  })
})
