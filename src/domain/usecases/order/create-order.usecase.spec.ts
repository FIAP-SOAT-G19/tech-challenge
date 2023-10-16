import { CreateOrderUseCase } from './create-order.usecase'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { IOrderRepository } from '@/ports/repositories/order.port'
import { IClientRepository } from '@/ports/repositories/client.port'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import { IOrderProductRepository } from '@/ports/repositories/order-product.port'
import { IProductRepository } from '@/ports/repositories/product.port'

const uuidGenerator = mock<IUUIDGenerator>()
const orderRepository = mock<IOrderRepository>()
const clientRepository = mock<IClientRepository>()
const schemaValidator = mock<ISchemaValidator>()
const orderProductRepository = mock<IOrderProductRepository>()
const productRepository = mock<IProductRepository>()

jest.mock('../../../shared/helpers/string.helper', () => {
  const originalMethod = jest.requireActual('../../../shared/helpers/string.helper')
  return {
    ...originalMethod,
    ramdonStringGenerator: jest.fn().mockReturnValue('anyOrderNumber')
  }
})

describe('CreateOrderUseCase', () => {
  let sut: CreateOrderUseCase
  let input: any

  beforeEach(() => {
    sut = new CreateOrderUseCase(schemaValidator, uuidGenerator, clientRepository, orderRepository, orderProductRepository, productRepository)
    input = {
      clientId: 'anyClientId',
      clientDocument: null,
      products: [{
        id: 'anyProductId',
        name: 'anyProductName',
        category: 'anyCategory',
        price: 2500,
        description: 'AnyDescription',
        image: 'anyimageUrl',
        amount: 2
      }]
    }
    uuidGenerator.generate.mockReturnValue('anyUUID')
    orderRepository.save.mockResolvedValue('anyOrderId')
    clientRepository.getById.mockResolvedValue({
      id: 'anyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      password: 'anyClientPassword',
      cpf: 'anyClientCpf',
      createdAt: new Date('2023-01-01 13:45:18'),
      updatedAt: null,
      deletedAt: null
    })
    schemaValidator.validate.mockReturnValue({ value: input })
    productRepository.getById.mockResolvedValue({
      id: 'anyProductId',
      name: 'anyProductName',
      category: 'anyCategory',
      price: 2500,
      description: 'AnyDescription',
      image: 'anyimageUrl',
      amount: 2
    })

    jest.clearAllMocks()
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

  test('should throws if validation fails', async () => {
    const error = { value: {}, error: 'anyError' }
    schemaValidator.validate.mockReturnValueOnce(error)

    const output = sut.execute(input)

    await expect(output).rejects.toThrow()
  })

  test('should throws if clientRepository.getById returns null', async () => {
    clientRepository.getById.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('clientId'))
  })

  test('should throws if ProductRepository.getById returns null', async () => {
    productRepository.getById.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('productId'))
  })

  test('should throws error if clientId and clientDocument are null', async () => {
    input.clientDocument = null
    input.clientId = null

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new MissingParamError('clientId or clientDocument'))
  })

  test('should call UUIDGenerator', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(2)
  })

  test('should call OrderRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(orderRepository.save).toHaveBeenCalledTimes(1)
    expect(orderRepository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      clientId: 'anyClientId',
      orderNumber: 'anyOrderNumber',
      clientDocument: null,
      status: 'waitingPayment',
      totalValue: 5000,
      createdAt: new Date()
    })
  })

  test('should call OrderRepository.save once and with correct values and without clientId', async () => {
    input.clientId = null
    input.clientDocument = 'anyClientDocument'

    await sut.execute(input)

    expect(orderRepository.save).toHaveBeenCalledTimes(1)
    expect(orderRepository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      orderNumber: 'anyOrderNumber',
      clientId: null,
      clientDocument: 'anyClientDocument',
      status: 'waitingPayment',
      totalValue: 5000,
      createdAt: new Date()
    })
  })

  test('should return a correct orderId and orderNumber', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      orderNumber: 'anyOrderNumber'
    })
  })

  test('should call calculateTotalValue once and with correct values', async () => {
    const spy = jest.spyOn(sut as any, 'calculateTotalValue')

    await sut.execute(input)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(input.products)
  })

  test('should calculate total value correctly', async () => {
    const total = sut.calculateTotalValue(input.products)

    expect(total).toBe(5000)
  })

  test('should call OrderProductRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(orderProductRepository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      productId: 'anyProductId',
      orderId: 'anyUUID',
      amount: 2,
      productPrice: 2500,
      createdAt: new Date()
    })
  })
})
