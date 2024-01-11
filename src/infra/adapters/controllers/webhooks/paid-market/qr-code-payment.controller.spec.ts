import { IUpdateOrderStatusUseCase } from '@/application/interfaces'
import { HttpRequest, success, serverError } from '@/infra/shared'
import { QrCodePaymentController } from './qr-code-payment.controller'
import { mock } from 'jest-mock-extended'
import { IUpdatePaymentStatus } from '@/application/interfaces/usecases/payment/update-payment-status.interface'

const updateOrderStatusUseCase = mock<IUpdateOrderStatusUseCase>()
const updatePaymentStatusUseCase = mock<IUpdatePaymentStatus>()

describe('QrCodePaymentController', () => {
  let sut: QrCodePaymentController
  let input: HttpRequest

  beforeEach(() => {
    sut = new QrCodePaymentController(updateOrderStatusUseCase, updatePaymentStatusUseCase)
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

  test('should call updatePaymentStatusUseCase once and with correct values', async () => {
    input.body.status = 'refused'
    input.body.reason = 'anyReason'
    await sut.execute(input)

    expect(updatePaymentStatusUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updatePaymentStatusUseCase.execute).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'refused',
      reason: 'anyReason'
    })
  })

  test('should call updatePaymentStatusUseCase once and with correct values', async () => {
    input.body.status = 'approved'
    await sut.execute(input)

    expect(updatePaymentStatusUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updatePaymentStatusUseCase.execute).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'approved',
      reason: null
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
