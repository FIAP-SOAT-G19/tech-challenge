import { IDeleteOrderUseCase } from '@/ports/usecases/order/delete-order.port'
import { HttpRequest } from '@/shared/types/http.types'
import { mock } from 'jest-mock-extended'
import { DeleteOrderController } from './delete-order.controller'
import { serverError, success } from '@/shared/helpers/http.helper'

const deleteOrderUseCase = mock<IDeleteOrderUseCase>()

describe('DeleteOrderController', () => {
  let sut: DeleteOrderController
  let input: HttpRequest

  beforeEach(() => {
    sut = new DeleteOrderController(deleteOrderUseCase)
    input = {
      params: {
        orderNumber: 'anyOrderNumber'
      }
    }
  })

  test('should call DeleteOrderUseCase once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(deleteOrderUseCase.execute).toHaveBeenCalledTimes(1)
    expect(deleteOrderUseCase.execute).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should return an error if DeleteOrderUseCase throws', async () => {
    const error = new Error('Internal server error')
    deleteOrderUseCase.execute.mockImplementationOnce(() => {
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
