
import { ICreateOrderUseCase } from '@/ports/usecases/order/create-order-usecase.port'
import { CreateOrderUseCase } from './create-order.usecase'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { IOrderRepository } from '@/ports/repositories/order.port'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const uuidGenerator = mock<IUUIDGenerator>()
const orderRepository = mock<IOrderRepository>()

describe('CreateOrderUseCase', () => {
  let sut: ICreateOrderUseCase
  let input: any

  beforeEach(() => {
    sut = new CreateOrderUseCase(uuidGenerator, orderRepository)
    input = {
      clientId: 'anyClientId',
      totalValue: 5000,
      paidAt: new Date()
    }
    uuidGenerator.generate.mockReturnValue('anyUUID')
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call OrderRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(orderRepository.save).toHaveBeenCalledTimes(1)
    expect(orderRepository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      clientId: 'anyClientId',
      totalValue: 5000,
      createdAt: new Date(),
      paidAt: new Date()
    })
  })

  test('should call OrderRepository.save once and with correct values and without clientId and paidAt', async () => {
    input.clientId = null
    input.paidAt = null

    await sut.execute(input)

    expect(orderRepository.save).toHaveBeenCalledTimes(1)
    expect(orderRepository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      clientId: null,
      totalValue: 5000,
      createdAt: new Date(),
      paidAt: null
    })
  })
})
