import { InvalidParamError, MissingParamError } from '@/infra/shared'
import { GetOrderByNumberUseCase } from './get-order-by-number.usecase'
import { mock } from 'jest-mock-extended'
import { OrderOutput } from './orders.types'
import { IGetOrderByNumberGateway } from '@/application/interfaces'

const gateway = mock<IGetOrderByNumberGateway>()
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

describe('GetOrderByNumberUseCase', () => {
  let sut: GetOrderByNumberUseCase

  beforeEach(() => {
    sut = new GetOrderByNumberUseCase(gateway)
    gateway.getByOrderNumber.mockResolvedValue(orderOutput)
  })

  test('should throw if orderNumber does not provided', async () => {
    const output = sut.execute(null as any)

    await expect(output).rejects.toThrowError(new MissingParamError('orderNumber'))
  })

  test('should call gateway.getByOrderNumbergetByNumber once and with correct orderNumber', async () => {
    await sut.execute('anyOrderNumber')

    expect(gateway.getByOrderNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getByOrderNumber).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should return a order', async () => {
    const output = await sut.execute('anyOrderNumber')

    expect(output).toEqual(orderOutput)
  })

  test('should throws if orderNumber is invalid', async () => {
    gateway.getByOrderNumber.mockResolvedValueOnce(null)

    const output = sut.execute('anyOrderNumber')

    await expect(output).rejects.toThrowError(new InvalidParamError('Order not found'))
  })
})
