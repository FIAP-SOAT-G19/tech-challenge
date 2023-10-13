import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { UpdateOrderStatusUseCase } from './update-order-status.usecase'
import { IOrderRepository } from '@/ports'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const orderRepository = mock<IOrderRepository>()

describe('UpdateOrderStatusUseCase', () => {
  let sut: UpdateOrderStatusUseCase
  let input: any

  beforeEach(() => {
    sut = new UpdateOrderStatusUseCase(orderRepository)
    input = {
      orderNumber: 'anyOrderNumber',
      status: 'received'
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throws if orderNumber is not provided', async() => {
    input.orderNumber = undefined

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new MissingParamError('orderNumber'))
  })

  test('should throws if status is not provided', async() => {
    input.status = undefined

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new MissingParamError('status'))
  })

  test('should throws if status is invalid', async() => {
    input.status = 'invalid-status'

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('status'))
  })

  test('should call OrderRepository.updateStatus once and with correct values', async () => {
    await sut.execute(input)

    expect(orderRepository.updateStatus).toHaveBeenCalledTimes(1)
    expect(orderRepository.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'received',
      paidAt: new Date()
    })
  })

  test('should call OrderRepository.updateStatus once and with correct values without paidAt', async () => {
    input.status = 'canceled'
    await sut.execute(input)

    expect(orderRepository.updateStatus).toHaveBeenCalledTimes(1)
    expect(orderRepository.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'canceled',
      paidAt: null
    })
  })
})
