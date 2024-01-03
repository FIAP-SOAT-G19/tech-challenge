import { UpdateOrderStatusUseCase } from './update-order-status.usecase'
import { MissingParamError, InvalidParamError } from '@/infra/shared'
import { OrderOutput } from './orders.types'
import { IUpdateOrderStatusGateway } from '@/application/interfaces'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<IUpdateOrderStatusGateway>()
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
    sut = new UpdateOrderStatusUseCase(gateway)
    input = {
      orderNumber: 'anyOrderNumber',
      status: 'received'
    }
    gateway.getByOrderNumber.mockResolvedValue(orderOutput)
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
    gateway.getByOrderNumber.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('orderNumber'))
  })

  test('should call gateway.updateStatus once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.updateStatus).toHaveBeenCalledTimes(1)
    expect(gateway.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'received',
      paidAt: new Date()
    })
  })

  test('should call gateway.updateStatus once and with correct values without paidAt', async () => {
    input.status = 'canceled'
    await sut.execute(input)

    expect(gateway.updateStatus).toHaveBeenCalledTimes(1)
    expect(gateway.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'canceled',
      paidAt: null
    })
  })
})
