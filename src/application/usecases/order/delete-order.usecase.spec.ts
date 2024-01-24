import { MissingParamError, InvalidParamError } from '@/infra/shared'
import { DeleteOrderUseCase } from './delete-order.usecase'
import { OrderOutput } from './orders.types'
import { IDeleteOrderGateway } from '@/application/interfaces'
import { mock } from 'jest-mock-extended'

const gateway = mock<IDeleteOrderGateway>()
let orderOutput: OrderOutput

describe('DeleteOrderUseCase', () => {
  let sut: DeleteOrderUseCase

  beforeEach(() => {
    sut = new DeleteOrderUseCase(gateway)
    orderOutput = {
      id: 'anyOrderId',
      orderNumber: 'anyOrderNumber',
      clientId: 'anyClientId',
      clientDocument: null,
      status: 'canceled',
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
    gateway.getOrderByNumber.mockResolvedValue(orderOutput)
  })

  test('should call OrderRepository.getOrderByNumber once and with correct orderNumber', async () => {
    await sut.execute('anyOrderNumber')

    expect(gateway.getOrderByNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getOrderByNumber).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should throws if orderNumber is not provided', async () => {
    const output = sut.execute(null as any)

    await expect(output).rejects.toThrowError(new MissingParamError('orderNumber'))
  })

  test('should throws an exception if order status is invalid', async () => {
    gateway.getOrderByNumber.mockResolvedValueOnce({
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
    })

    const output = sut.execute('anyOrderNumber')

    await expect(output).rejects.toThrowError(new InvalidParamError('only orders with canceled status can be deleted'))
  })

  test('should throws an exception if order status is invalid', async () => {
    gateway.getOrderByNumber.mockResolvedValueOnce(null)

    const output = sut.execute('anyOrderNumber')

    await expect(output).rejects.toThrowError(new InvalidParamError('orderNumber'))
  })

  test('should call gateway.deleteOrder once and with correct orderNumber', async () => {
    await sut.execute('anyOrderNumber')

    expect(gateway.deleteOrder).toHaveBeenCalledTimes(1)
    expect(gateway.deleteOrder).toHaveBeenCalledWith('anyOrderNumber')
  })
})
