
import { ICreateOrderUseCase } from '@/ports/usecases/order/create-order.port'
import { CreateOrderUseCase } from './create-order.usecase'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { IOrderRepository } from '@/ports/repositories/order.port'
import { IClientRepository } from '@/ports/repositories/client.port'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'

const uuidGenerator = mock<IUUIDGenerator>()
const orderRepository = mock<IOrderRepository>()
const clientRepository = mock<IClientRepository>()
const schemaValidator = mock<ISchemaValidator>()

describe('CreateOrderUseCase', () => {
  let sut: ICreateOrderUseCase
  let input: any

  beforeEach(() => {
    sut = new CreateOrderUseCase(schemaValidator, uuidGenerator, clientRepository, orderRepository)
    input = {
      clientId: 'anyClientId',
      totalValue: 5000
    }
    uuidGenerator.generate.mockReturnValue('anyUUID')
    orderRepository.save.mockResolvedValue('anyOrderId')
    clientRepository.getById.mockResolvedValue({
      id: '',
      name: '',
      email: '',
      password: '',
      cpf: '',
      createdAt: new Date('2023-01-01 13:45:18'),
      updatedAt: null,
      deletedAt: null
    })
    schemaValidator.validate.mockReturnValue({ value: input })
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call clientRepository.getById once and with correct clientId', async () => {
    await sut.execute(input)

    expect(clientRepository.getById).toHaveBeenCalledTimes(1)
    expect(clientRepository.getById).toHaveBeenCalledWith('anyClientId')
  })

  test('should call schemaValidator once and with correct values', async () => {
    await sut.execute(input)

    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'orderSchema', data: input })
  })

  test('should throws if clientRepository.getById returns null', async () => {
    clientRepository.getById.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('clientId'))
  })

  test('should throws if totalValue is falsy', async () => {
    input.totalValue = null

    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('anyError'))
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
      status: 'waiting_payment',
      totalValue: 5000,
      createdAt: new Date()
    })
  })

  test('should call OrderRepository.save once and with correct values and without clientId', async () => {
    input.clientId = null

    await sut.execute(input)

    expect(orderRepository.save).toHaveBeenCalledTimes(1)
    expect(orderRepository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      clientId: null,
      status: 'waiting_payment',
      totalValue: 5000,
      createdAt: new Date()
    })
  })

  test('should return a correct orderId', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('anyOrderId')
  })
})
