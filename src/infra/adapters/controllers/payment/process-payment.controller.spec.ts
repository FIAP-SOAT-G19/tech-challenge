import { HttpRequest, InvalidParamError, badRequest, serverError, success } from '@/infra/shared'
import { ProcessPaymentController } from './process-payment.controller'
import { IProcessPaymentUseCase } from '@/application/interfaces/usecases/payment/process-payment.interface'
import { mock } from 'jest-mock-extended'

const processPaymentUseCase = mock<IProcessPaymentUseCase>()

describe('ProcessPaymentController', () => {
  let sut: ProcessPaymentController
  let input: HttpRequest

  beforeEach(() => {
    sut = new ProcessPaymentController(processPaymentUseCase)
    input = {
      params: {
        orderNumber: 'anyOrderNumber'
      },
      body: {
        payer: {
          name: 'anyName',
          document: 'anyDocument'
        },
        creditCard: {
          brand: 'mastercard',
          number: '5115456501660190',
          cvv: '573',
          expiration: '08/25'
        }
      }
    }
  })

  test('should call ProcessPaymentUseCase.execute once and with correct values', async () => {
    await sut.execute(input)

    expect(processPaymentUseCase.execute).toHaveBeenCalledTimes(1)
    expect(processPaymentUseCase.execute).toHaveBeenCalledWith({
      payer: {
        name: 'anyName',
        document: 'anyDocument'
      },
      creditCard: {
        brand: 'mastercard',
        number: '5115456501660190',
        cvv: '573',
        expiration: '08/25'
      },
      orderNumber: 'anyOrderNumber'
    })
  })

  test('should return a correct error if ProcessPaymentUseCase throws', async () => {
    const error = new Error('Internal server error')
    processPaymentUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })

  test('should return a correct error if ProcessPaymentUseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    processPaymentUseCase.execute.mockImplementationOnce(() => {
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
