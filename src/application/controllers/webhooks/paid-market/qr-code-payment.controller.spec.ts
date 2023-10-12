import { HttpRequest } from '@/shared/types/http.types'
import { QrCodePaymentController } from './qr-code-payment.controller'
import { mock } from 'jest-mock-extended'
import { IHandleProcessedPayment } from '@/ports/usecases/payment/handle-processed-payment.port'
import { serverError, success } from '@/shared/helpers/http.helper'

const handleProcessedPaymentUseCase = mock<IHandleProcessedPayment>()

describe('QrCodePaymentController', () => {
  let sut: QrCodePaymentController
  let input: HttpRequest

  beforeEach(() => {
    sut = new QrCodePaymentController(handleProcessedPaymentUseCase)
    input = {
      body: {
        orderNumber: 'anyOrderNumber',
        status: 'approved'
      }
    }
  })

  test('should call HandleProcessedPaymentUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(handleProcessedPaymentUseCase.execute).toHaveBeenCalledTimes(1)
    expect(handleProcessedPaymentUseCase.execute).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'approved'
    })
  })

  test('should return 200 on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(200, {}))
  })

  test('should return 500 if HandleProcessedPaymentUseCase throws an exception', async () => {
    const error = new Error('Internal server error')
    handleProcessedPaymentUseCase.execute.mockImplementationOnce(() => {
      throw error
    })
    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })
})
