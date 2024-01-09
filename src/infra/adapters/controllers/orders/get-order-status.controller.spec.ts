import { mock } from 'jest-mock-extended'
import { GetOrderStatusController } from './get-order-status.controller'
import { IGetOrderStatusUseCase } from '@/application/interfaces/usecases/order/get-order-status.interface'
import { HttpRequest, InvalidParamError, badRequest, success } from '@/infra/shared'

const getOrderStatusUseCase = mock<IGetOrderStatusUseCase>()

describe('GetOrderStatusController', () => {
  let sut: GetOrderStatusController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetOrderStatusController(getOrderStatusUseCase)
    input = {
      params: {
        orderNumber: 'anyOrderNumber'
      }
    }
    getOrderStatusUseCase.execute.mockResolvedValue({ status: 'received' })
  })

  test('should call getOrderStatusUseCase.execute onde and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(getOrderStatusUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getOrderStatusUseCase.execute).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should return a correct status', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(200, { status: 'received' }))
  })

  test('should return a correct error if getOrderStatusUseCase.execute throws an exception', async () => {
    const error = new InvalidParamError('Any ERROR')

    getOrderStatusUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
