import { IUUIDGenerator, ISchemaValidator, ICreateOrderGateway } from '@/application/interfaces'
import { InvalidParamError } from '@/infra/shared'
import { CreateOrderUseCase } from './create-order.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const uuidGenerator = mock<IUUIDGenerator>()
const schemaValidator = mock<ISchemaValidator>()
const gateway = mock<ICreateOrderGateway>()

jest.mock('@/infra/shared/helpers/string.helper', () => {
  const originalMethod = jest.requireActual('@/infra/shared/helpers/string.helper')
  return {
    ...originalMethod,
    ramdonStringGenerator: jest.fn().mockReturnValue('anyOrderNumber')
  }
})

describe('CreateOrderUseCase', () => {
  let sut: CreateOrderUseCase
  let input: any

  beforeEach(() => {
    sut = new CreateOrderUseCase(schemaValidator, uuidGenerator, gateway)
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
    gateway.saveOrder.mockResolvedValue('anyOrderId')
    gateway.getClientById.mockResolvedValue({
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
    gateway.getProductById.mockResolvedValue({
      id: 'anyProductId',
      name: 'anyProductName',
      category: 'anyCategory',
      price: 2500,
      description: 'AnyDescription',
      image: 'anyimageUrl'
    })

    jest.clearAllMocks()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call gateway.getClientById once and with correct clientId', async () => {
    await sut.execute(input)

    expect(gateway.getClientById).toHaveBeenCalledTimes(1)
    expect(gateway.getClientById).toHaveBeenCalledWith('anyClientId')
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

  test('should throws if gateway.getClientById returns null', async () => {
    gateway.getClientById.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('clientId'))
  })

  test('should throws if gateway.getProductById returns null', async () => {
    gateway.getProductById.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('productId'))
  })

  test('should call UUIDGenerator', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(3)
  })

  test('should call gateway.saveOrder once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.saveOrder).toHaveBeenCalledTimes(1)
    expect(gateway.saveOrder).toHaveBeenCalledWith({
      id: 'anyUUID',
      clientId: 'anyClientId',
      orderNumber: 'anyOrderNumber',
      clientDocument: null,
      status: 'waitingPayment',
      totalValue: 5000,
      createdAt: new Date()
    })
  })

  test('should call gateway.saveOrder once and with correct values and without clientId', async () => {
    input.clientId = null
    input.clientDocument = 'anyClientDocument'

    await sut.execute(input)

    expect(gateway.saveOrder).toHaveBeenCalledTimes(1)
    expect(gateway.saveOrder).toHaveBeenCalledWith({
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

  test('should call gateway.saveOrderProduct once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.saveOrderProduct).toHaveBeenCalledWith({
      id: 'anyUUID',
      productId: 'anyProductId',
      orderId: 'anyUUID',
      amount: 2,
      productPrice: 2500,
      createdAt: new Date()
    })
  })

  test('should call gateway.createPayment once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.createPayment).toHaveBeenCalledTimes(1)
    expect(gateway.createPayment).toHaveBeenCalledWith({
      id: 'anyUUID',
      orderNumber: 'anyOrderNumber',
      status: 'waiting',
      reason: null,
      createdAt: new Date(),
      updatedAt: null
    })
  })
})
