import { HttpRequest } from '@/shared/types/http.types'
import { UpdateOrderStatusController } from './update-order-status.controller'
import { mock } from 'jest-mock-extended'
import { IUpdateOrderStatusUseCase } from '@/ports/usecases/order/update-oder-status.port'
import { serverError, success } from '@/shared/helpers/http.helper'

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

  test('should return an error if UpdateOrderStatusUseCase throws', async () => {
    const error = new Error('Internal server error')
    updateOrderStatusUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })

  test('should return 204 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(204, null))
  })
})
