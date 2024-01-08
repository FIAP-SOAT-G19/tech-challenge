
import { IPaymentGateway } from '@/application/interfaces/gateways/payment/process-payment-gateway.interface'
import { ProcessPaymentUseCase } from './process.payment.usecase'
import { IProcessPaymentUseCase } from '@/application/interfaces/usecases/payment/process-payment.interface'
import { IUUIDGenerator } from '@/application/interfaces'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<IPaymentGateway>()
const uuidGenerator = mock<IUUIDGenerator>()

describe('ProcessPaymentUseCase', () => {
  let sut: ProcessPaymentUseCase
  let input: IProcessPaymentUseCase.Input

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(uuidGenerator, gateway)

    input = {
      payer: {
        name: 'Any Payer',
        document: 'anyDocument'
      },
      creditCard: {
        brand: 'anyBrand',
        number: 'anyNumber',
        cvv: 'anyCvv',
        expiration: '2023-12'
      },
      orderNumber: 'anyOrderNumber'
    }

    gateway.processPayment.mockResolvedValue({
      status: 'approved',
      reason: undefined
    })

    uuidGenerator.generate.mockReturnValue('anyUUID')

    jest.clearAllMocks()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call Payment Gateway once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.processPayment).toHaveBeenCalledTimes(1)
    expect(gateway.processPayment).toHaveBeenCalledWith(input)
  })

  test('should call gateway.createPaymentStatus once and with correct values when payment approved', async () => {
    await sut.execute(input)

    expect(gateway.createPaymentStatus).toHaveBeenCalledTimes(1)
    expect(gateway.createPaymentStatus).toHaveBeenCalledWith({
      id: 'anyUUID',
      orderNumber: 'anyOrderNumber',
      status: 'approved',
      reason: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  test('should call gateway.createPaymentStatus once and with correct values when payment refused', async () => {
    gateway.processPayment.mockResolvedValue({
      status: 'refused',
      reason: 'Saldo insuficiente'
    })

    await sut.execute(input)

    expect(gateway.createPaymentStatus).toHaveBeenCalledTimes(1)
    expect(gateway.createPaymentStatus).toHaveBeenCalledWith({
      id: 'anyUUID',
      orderNumber: 'anyOrderNumber',
      status: 'refused',
      reason: 'Saldo insuficiente',
      createdAt: new Date(),
      updatedAt: new Date()
    })
  })

  test('should call gateway.updateOrderStatus once and with correct values when payment approved', async () => {
    await sut.execute(input)

    expect(gateway.updateOrderStatus).toHaveBeenCalledTimes(1)
    expect(gateway.updateOrderStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'received'
    })
  })

  test('should call gateway.updateOrderStatus once and with correct values when payment refused', async () => {
    gateway.processPayment.mockResolvedValue({
      status: 'refused',
      reason: 'Saldo insuficiente'
    })

    await sut.execute(input)

    expect(gateway.updateOrderStatus).toHaveBeenCalledTimes(1)
    expect(gateway.updateOrderStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'canceled'
    })
  })

  test('should return a correct response', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      status: 'approved',
      reason: null
    })
  })
})
