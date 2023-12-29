import { IOrderRepository } from '@/application/interfaces'
import { MissingParamError } from '@/infra/shared'
import { GetOrderByNumberUseCase } from './get-order-by-number.usecase'
import { mock } from 'jest-mock-extended'
import { OrderOutput } from './orders.types'

const orderRepository = mock<IOrderRepository>()
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
    sut = new GetOrderByNumberUseCase(orderRepository)
    orderRepository.getByOrderNumber.mockResolvedValue(orderOutput)
  })

  test('should throw if orderNumber does not provided', async () => {
    const output = sut.execute(null as any)

    await expect(output).rejects.toThrowError(new MissingParamError('orderNumber'))
  })

  test('should call OrderRepository.getByNumber once and with correct orderNumber', async () => {
    await sut.execute('anyOrderNumber')

    expect(orderRepository.getByOrderNumber).toHaveBeenCalledTimes(1)
    expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should return a order', async () => {
    const output = await sut.execute('anyOrderNumber')

    expect(output).toEqual(orderOutput)
  })

  test('should return null if OrderRepository.getByNumber returns', async () => {
    orderRepository.getByOrderNumber.mockResolvedValueOnce(null)
    const output = await sut.execute('anyOrderNumber')

    expect(output).toBeNull()
  })
})
