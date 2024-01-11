
import { IPaymentGateway } from '@/application/interfaces/gateways/payment/process-payment-gateway.interface'
import { ProcessPaymentUseCase } from './process.payment.usecase'
import { IProcessPaymentUseCase } from '@/application/interfaces/usecases/payment/process-payment.interface'
import { ISchemaValidator, IUUIDGenerator } from '@/application/interfaces'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { ICardValidator } from '@/application/interfaces/validators/card-validator.interface'
import { InvalidParamError } from '@/infra/shared'
import { OrderOutput } from '../order/orders.types'

const gateway = mock<IPaymentGateway>()
const uuidGenerator = mock<IUUIDGenerator>()
const schemaValidator = mock<ISchemaValidator>()
const cardValidator = mock<ICardValidator>()
const orderOutput: OrderOutput = {
  id: 'anyOrderId',
  orderNumber: 'anyOrderNumber',
  clientId: 'anyClientId',
  clientDocument: null,
  status: 'waitingPayment',
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

describe('ProcessPaymentUseCase', () => {
  let sut: ProcessPaymentUseCase
  let input: IProcessPaymentUseCase.Input

  beforeEach(() => {
    sut = new ProcessPaymentUseCase(schemaValidator, cardValidator, gateway)

    input = {
      payer: {
        name: 'Any Payer',
        document: 'anyDocument'
      },
      creditCard: {
        brand: 'anyBrand',
        number: 'anyNumber',
        cvv: 'anyCvv',
        expiryMonth: '10',
        expiryYear: '2024'
      },
      orderNumber: 'anyOrderNumber'
    }

    uuidGenerator.generate.mockReturnValue('anyUUID')
    schemaValidator.validate.mockReturnValue({ value: input })
    cardValidator.validate.mockReturnValue(null)
    gateway.getByOrderNumber.mockResolvedValue(orderOutput)
    gateway.countPaymentByStatusAndOrderNumber.mockResolvedValue(0)

    jest.clearAllMocks()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call schemaValidation once and with correct values', async () => {
    await sut.execute(input)

    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'paymentSchema', data: input })
  })

  test('should throws if schema validator fails', async () => {
    const error = { value: {}, error: 'anyError' }
    schemaValidator.validate.mockReturnValueOnce(error)

    const output = sut.execute(input)

    await expect(output).rejects.toThrow()
  })

  test('should call cardValidation once and with correct values', async () => {
    await sut.execute(input)

    expect(cardValidator.validate).toHaveBeenCalledTimes(1)
    expect(cardValidator.validate).toHaveBeenCalledWith(input.creditCard)
  })

  test('should throws if card validation fails', async () => {
    cardValidator.validate.mockReturnValueOnce({ field: 'number' })

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('CreditCard: number'))
  })

  test('should call gateway.getByOrderNumber once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(gateway.getByOrderNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getByOrderNumber).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should throws if gateway.getByOrderNumber returns null', async () => {
    gateway.getByOrderNumber.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('orderNumber'))
  })

  test('should call gateway.countPaymentByStatusAndOrderNumber once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.countPaymentByStatusAndOrderNumber).toHaveBeenCalledTimes(1)
    expect(gateway.countPaymentByStatusAndOrderNumber).toHaveBeenCalledWith('processing', 'anyOrderNumber')
  })

  test('should throws if there is already a payment processing', async () => {
    gateway.countPaymentByStatusAndOrderNumber.mockResolvedValueOnce(1)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('This payment cannot be processed'))
  })

  test('should throws if order status is not waitingPayment', async () => {
    gateway.getByOrderNumber.mockResolvedValue({
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
    })

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('This payment cannot be processed'))
  })

  test('should  call gateway.updateStatus once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.updateStatus).toHaveBeenCalledTimes(1)
    expect(gateway.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'processing',
      reason: null
    })
  })

  test('should call Payment Gateway once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.processPayment).toHaveBeenCalledTimes(1)
    expect(gateway.processPayment).toHaveBeenCalledWith(input)
  })
})
