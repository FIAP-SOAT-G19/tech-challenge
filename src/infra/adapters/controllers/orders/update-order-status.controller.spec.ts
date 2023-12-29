import { IUpdateOrderStatusUseCase } from '@/application/interfaces'
import { HttpRequest, serverError, InvalidParamError, badRequest, success } from '@/infra/shared'
import { UpdateOrderStatusController } from './update-order-status.controller'
import { mock } from 'jest-mock-extended'

const updateOrderStatusUseCase = mock<IUpdateOrderStatusUseCase>()

describe('UpdateOrderStatusController', () => {
  let sut: UpdateOrderStatusController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateOrderStatusController(updateOrderStatusUseCase)
    input = {
      params: {
        orderNumber: 'anyOrderNumber'
      },
      body: {
        status: 'anyStatus'
      }
    }
  })

  test('should call UpdateOrderStatusUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateOrderStatusUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateOrderStatusUseCase.execute).toHaveBeenCalledWith({ orderNumber: 'anyOrderNumber', status: 'anyStatus' })
  })

  test('should return a correct error if UpdateOrderStatusUseCase throws', async () => {
    const error = new Error('Internal server error')
    updateOrderStatusUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })

  test('should return a correct error if UpdateOrderStatusUseCase throws', async () => {
    const error = new InvalidParamError('Any error')
    updateOrderStatusUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })

  test('should return 204 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(204, null))
  })
})
