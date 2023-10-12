import { MissingParamError } from '@/shared/errors'
import { HandleProcessedPayment } from './handle-processed-payment'
import { IOrderRepository } from '@/ports'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const orderRepository = mock<IOrderRepository>()

describe('HandleProcessedPayment', () => {
  let sut: HandleProcessedPayment
  let input: any

  beforeEach(() => {
    sut = new HandleProcessedPayment(orderRepository)
    input = {
      orderNumber: 'anyOrderNumber',
      paymentStatus: 'anyStatus'
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throws if orderNumber is not provided', async () => {
    input.orderNumber = undefined

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new MissingParamError('orderNumber'))
  })

  test('should throws if paymentStatus is not provided', async () => {
    input.paymentStatus = undefined

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new MissingParamError('paymentStatus'))
  })

  test('should call OrderRepository.updateStatus once and with correct values', async () => {
    input.paymentStatus = 'approved'

    await sut.execute(input)

    expect(orderRepository.updateStatus).toHaveBeenCalledTimes(1)
    expect(orderRepository.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'received',
      paidAt: new Date()
    })
  })

  test('should call OrderRepository.updateStatus once and with correct values', async () => {
    input.paymentStatus = 'refused'

    await sut.execute(input)

    expect(orderRepository.updateStatus).toHaveBeenCalledTimes(1)
    expect(orderRepository.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'canceled',
      paidAt: new Date()
    })
  })
})
