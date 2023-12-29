import { IUpdateOrderStatusUseCase } from '@/application/interfaces'
import { HttpRequest, success, serverError } from '@/infra/shared'
import { QrCodePaymentController } from './qr-code-payment.controller'
import { mock } from 'jest-mock-extended'

const updateOrderStatusUseCase = mock<IUpdateOrderStatusUseCase>()

describe('QrCodePaymentController', () => {
  let sut: QrCodePaymentController
  let input: HttpRequest

  beforeEach(() => {
    sut = new QrCodePaymentController(updateOrderStatusUseCase)
    input = {
      body: {
        orderNumber: 'anyOrderNumber',
        status: 'approved'
      }
    }
  })

  test('should call updateOrderStatusUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateOrderStatusUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateOrderStatusUseCase.execute).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'received'
    })
  })

  test('should call updateOrderStatusUseCase once and with correct values', async () => {
    input.body.status = 'refused'
    await sut.execute(input)

    expect(updateOrderStatusUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateOrderStatusUseCase.execute).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'canceled'
    })
  })

  test('should return 204 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(204, null))
  })

  test('should return 500 if updateOrderStatusUseCase throws an exception', async () => {
    const error = new Error('Internal server error')
    updateOrderStatusUseCase.execute.mockImplementationOnce(() => {
      throw error
    })
    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })
})
