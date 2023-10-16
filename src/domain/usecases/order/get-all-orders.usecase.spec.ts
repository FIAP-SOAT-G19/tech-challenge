import { IGetAllOrdersUseCase } from '@/ports/usecases/order/get-all-orders.port'
import { GetAllOrdersUseCase } from './get-all-orders.usecase'
import { mock } from 'jest-mock-extended'
import { IOrderRepository } from '@/ports'
import { OrderOutput } from '@/domain/types'
import { InvalidParamError } from '@/shared/errors'

const orderRepository = mock<IOrderRepository>()
const orders: OrderOutput [] = [{
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
},
{
  id: 'anotherOrderId',
  orderNumber: 'anotherOrderNumber',
  clientId: 'anotherClientId',
  clientDocument: null,
  status: 'finalized',
  totalValue: 4500,
  createdAt: new Date('2023-10-12 16:55:27'),
  paidAt: new Date('2023-10-12 17:13:26'),
  client: {
    name: 'anotherClientName',
    email: 'anotherClientEmail',
    cpf: 'anotherClientCpf'
  },
  products: [{
    id: 'anotherProductId',
    name: 'anotherProductName',
    category: 'anotherCategoryProduct',
    price: 1700,
    description: 'anotherDescriptionProduct',
    image: 'anotherImageProduct',
    amount: 3
  }]
}]

describe('GetAllOrdersUseCase', () => {
  let sut: GetAllOrdersUseCase
  let input: IGetAllOrdersUseCase.Input

  beforeEach(() => {
    sut = new GetAllOrdersUseCase(orderRepository)
    input = {}
    orderRepository.getAll.mockResolvedValue(orders)
  })

  test('should call OrderRepository.getAll once and with correct values', async () => {
    input.clientId = 'anyClientId'

    await sut.execute(input)

    expect(orderRepository.getAll).toHaveBeenCalledTimes(1)
    expect(orderRepository.getAll).toHaveBeenCalledWith({ clientId: 'anyClientId' })
  })

  test('should call OrderRepository.getAll once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'

    await sut.execute(input)

    expect(orderRepository.getAll).toHaveBeenCalledTimes(1)
    expect(orderRepository.getAll).toHaveBeenCalledWith({ clientId: 'anyClientId', status: 'waitingPayment' })
  })

  test('should throws if invalid status is provided', async () => {
    input.status = 'invalidStatus'

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('status'))
  })

  test('should call OrderRepository.getAll once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = new Date('2023-01-01 00:00:00')

    await sut.execute(input)

    expect(orderRepository.getAll).toHaveBeenCalledTimes(1)
    expect(orderRepository.getAll).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: new Date('2023-01-01 00:00:00')
    })
  })

  test('should call OrderRepository.getAll once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = new Date('2023-01-01 00:00:00')
    input.paidAtEndDate = new Date('2023-05-01 00:00:00')

    await sut.execute(input)

    expect(orderRepository.getAll).toHaveBeenCalledTimes(1)
    expect(orderRepository.getAll).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: new Date('2023-01-01 00:00:00'),
      paidAtEndDate: new Date('2023-05-01 00:00:00')
    })
  })

  test('should call OrderRepository.getAll once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = new Date('2023-01-01 00:00:00')
    input.paidAtEndDate = new Date('2023-05-01 00:00:00')
    input.createdAtInitialDate = new Date('2023-05-01 00:00:00')

    await sut.execute(input)

    expect(orderRepository.getAll).toHaveBeenCalledTimes(1)
    expect(orderRepository.getAll).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: new Date('2023-01-01 00:00:00'),
      paidAtEndDate: new Date('2023-05-01 00:00:00'),
      createdAtInitialDate: new Date('2023-05-01 00:00:00')
    })
  })

  test('should call OrderRepository.getAll once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = new Date('2023-01-01 00:00:00')
    input.paidAtEndDate = new Date('2023-05-01 00:00:00')
    input.createdAtInitialDate = new Date('2023-05-01 00:00:00')
    input.createdAtEndDate = new Date('2023-08-01 00:00:00')

    await sut.execute(input)

    expect(orderRepository.getAll).toHaveBeenCalledTimes(1)
    expect(orderRepository.getAll).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: new Date('2023-01-01 00:00:00'),
      paidAtEndDate: new Date('2023-05-01 00:00:00'),
      createdAtInitialDate: new Date('2023-05-01 00:00:00'),
      createdAtEndDate: new Date('2023-08-01 00:00:00')
    })
  })

  test('should return null if OrderRepository.getAll returns null', async () => {
    orderRepository.getAll.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should return all orders', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(orders)
  })
})