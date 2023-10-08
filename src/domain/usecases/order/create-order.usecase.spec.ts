import { CreateOrderUseCase } from './create-order.usecase'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { IOrderRepository } from '@/ports/repositories/order.port'
import { IClientRepository } from '@/ports/repositories/client.port'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { InvalidParamError } from '@/shared/errors'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import { IOrderProductRepository } from '@/ports/repositories/order-product.port'
import { IPayment } from '@/ports/gateways/payment/process-payment.port'

const uuidGenerator = mock<IUUIDGenerator>()
const orderRepository = mock<IOrderRepository>()
const clientRepository = mock<IClientRepository>()
const schemaValidator = mock<ISchemaValidator>()
const orderProductRepository = mock<IOrderProductRepository>()
const paymentGateway = mock<IPayment>()

describe('CreateOrderUseCase', () => {
  let sut: CreateOrderUseCase
  let input: any

  beforeEach(() => {
    sut = new CreateOrderUseCase(schemaValidator, uuidGenerator, clientRepository, orderRepository, orderProductRepository, paymentGateway)
    input = {
      clientId: 'anyClientId',
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
    paymentGateway.process.mockResolvedValue({ status: 'received' })
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
      orderId: 'anyOrderId',
      amount: 2,
      productPrice: 2500,
      createdAt: new Date()
    })
  })

  test('should call PaymentGateway once and with correct values', async () => {
    await sut.execute(input)

    expect(paymentGateway.process).toHaveBeenCalledTimes(1)
    expect(paymentGateway.process).toHaveBeenCalledWith({
      external_reference: 'anyOrderId',
      title: 'Tech-Challenge Payment',
      total_amount: 5000,
      items: [
        {
          category: input.products[0].category,
          title: input.products[0].name,
          description: input.products[0].description,
          unit_price: input.products[0].price,
          amount: input.products[0].amount,
          total_amount: 5000
        }
      ]
    })
  })

  test('should call OrderRepository.updateStatus once and with correct status', async () => {
    await sut.execute(input)

    expect(orderRepository.updateStatus).toHaveBeenCalledTimes(1)
    expect(orderRepository.updateStatus).toHaveBeenCalledWith('received', 'anyOrderId')
  })
})
