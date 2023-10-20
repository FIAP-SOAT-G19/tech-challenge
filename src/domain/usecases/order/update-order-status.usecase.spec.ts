import { UpdateOrderStatusUseCase } from './update-order-status.usecase'
import { InvalidParamError, MissingParamError } from '@/shared'
import { IOrderRepository } from '@/ports'
import { OrderOutput } from '@/domain/types'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'

const orderRepository = mock<IOrderRepository>()
const orderOutput: OrderOutput = {
  id: 'anyOrderId',
  orderNumber: 'anyOrderNumber',
  clientId: 'anyClientId',
  clientDocument: null,
  status: 'finalized',
  totalValue: 4500,
  createdAt: new Date('2023-10-12 16:55:27'),
  paidAt: new Date('2023-10-12 17:13:26'),
  client: {
    name: 'anyClientName',
    email: 'anyClientEmail',
    cpf: 'anyClientCpf'
  },
  products: [{
    id: 'anyProductId',
    name: 'anyProductName',
    category: 'anyCategoryProduct',
    price: 1700,
    description: 'anyDescriptionProduct',
    image: 'anyImageProduct',
    amount: 3
  }]
}

describe('UpdateOrderStatusUseCase', () => {
  let sut: UpdateOrderStatusUseCase
  let input: any

  beforeEach(() => {
    sut = new UpdateOrderStatusUseCase(orderRepository)
    input = {
      orderNumber: 'anyOrderNumber',
      status: 'received'
    }
    orderRepository.getByOrderNumber.mockResolvedValue(orderOutput)
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

  test('should throws if orderNumber is invalid', async () => {
    orderRepository.getByOrderNumber.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('orderNumber'))
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
