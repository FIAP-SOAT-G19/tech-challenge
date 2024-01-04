import { mock } from 'jest-mock-extended'
import { GetOrderStatusUseCase } from './get-order-status.usecase'
import { IGetOrderByNumberGateway } from '@/application/interfaces'
import { InvalidParamError } from '@/infra/shared'
import { OrderOutput } from './orders.types'

const gateway = mock<IGetOrderByNumberGateway>()
const order: OrderOutput = {
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

describe('GetOrderStatusUseCase', () => {
  let sut: GetOrderStatusUseCase

  beforeEach(() => {
    sut = new GetOrderStatusUseCase(gateway)
    gateway.getByOrderNumber.mockResolvedValue(order)
  })

  test('should call gateway.getOrderByNumber once and with correct orderNumber', async () => {
    await sut.execute('anyOrderNumber')

    expect(gateway.getByOrderNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getByOrderNumber).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should throw if gateway.getOrderByNumber returns null', async () => {
    gateway.getByOrderNumber.mockResolvedValueOnce(null)

    const output = sut.execute('anyOrderNumber')

    await expect(output).rejects.toThrowError(new InvalidParamError('Order not found'))
  })

  test('should return only order status on succes', async () => {
    const output = await sut.execute('anyOrderNumber')

    expect(output).toEqual({ status: order.status })
  })
})
