import { IGetAllOrdersUseCase, IGetAllOrdersGateway, IGetAllOrdersPresenter } from '@/application/interfaces'
import { InvalidParamError } from '@/infra/shared'
import { GetAllOrdersUseCase } from './get-all-orders.usecase'
import { OrderOutput } from './orders.types'
import { mock } from 'jest-mock-extended'

const gateway = mock<IGetAllOrdersGateway>()
const presenter = mock<IGetAllOrdersPresenter>()

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
    sut = new GetAllOrdersUseCase(gateway, presenter)
    input = {}
    gateway.getAllOrders.mockResolvedValue(orders)
    presenter.createOrdenation.mockReturnValue(orders)
  })

  test('should call gateway.getAllOrders once and with correct values', async () => {
    input.clientId = 'anyClientId'

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({ clientId: 'anyClientId' })
  })

  test('should call gateway.getAllOrders once and with correct values if status is passed in query', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({ clientId: 'anyClientId', status: 'waitingPayment' })
  })

  test('should call presenter.createOrdenation once with all orders returned', async () => {
    input.clientId = 'anyClientId'

    await sut.execute(input)

    expect(presenter.createOrdenation).toHaveBeenCalledTimes(1)
    expect(presenter.createOrdenation).toHaveBeenCalledWith(orders)
  })

  test('should throws if invalid status is provided', async () => {
    input.status = 'invalidStatus'

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('status'))
  })

  test('should call gateway.getAllOrders once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = '2023-01-01 00:00:00'

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: '2023-01-01 00:00:00'
    })
  })

  test('should call gateway.getAllOrders once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = '2023-01-01 00:00:00'
    input.paidAtEndDate = '2023-05-01 00:00:00'

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: '2023-01-01 00:00:00',
      paidAtEndDate: '2023-05-01 00:00:00'
    })
  })

  test('should call gateway.getAllOrders once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = '2023-01-01 00:00:00'
    input.paidAtEndDate = '2023-05-01 00:00:00'
    input.createdAtInitialDate = '2023-05-01 00:00:00'

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: '2023-01-01 00:00:00',
      paidAtEndDate: '2023-05-01 00:00:00',
      createdAtInitialDate: '2023-05-01 00:00:00'
    })
  })

  test('should call gateway.getAllOrders once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = '2023-01-01 00:00:00'
    input.paidAtEndDate = '2023-05-01 00:00:00'
    input.createdAtInitialDate = '2023-05-01 00:00:00'
    input.createdAtEndDate = '2023-08-01 00:00:00'

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      status: 'waitingPayment',
      paidAtInitialDate: '2023-01-01 00:00:00',
      paidAtEndDate: '2023-05-01 00:00:00',
      createdAtInitialDate: '2023-05-01 00:00:00',
      createdAtEndDate: '2023-08-01 00:00:00'
    })
  })

  test('should call gateway.getAllOrders once and with correct values', async () => {
    input.clientId = 'anyClientId'
    input.clientDocument = 'anyClientDocuyment'
    input.status = 'waitingPayment'
    input.paidAtInitialDate = '2023-01-01 00:00:00'
    input.paidAtEndDate = '2023-05-01 00:00:00'
    input.createdAtInitialDate = '2023-05-01 00:00:00'
    input.createdAtEndDate = '2023-08-01 00:00:00'

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({
      clientId: 'anyClientId',
      clientDocument: 'anyClientDocuyment',
      status: 'waitingPayment',
      paidAtInitialDate: '2023-01-01 00:00:00',
      paidAtEndDate: '2023-05-01 00:00:00',
      createdAtInitialDate: '2023-05-01 00:00:00',
      createdAtEndDate: '2023-08-01 00:00:00'
    })
  })

  test('should return null if gateway.getAllOrders and presenter.createOrdenation returns null', async () => {
    gateway.getAllOrders.mockResolvedValueOnce(null)
    presenter.createOrdenation.mockReturnValue(null)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should return null if presenter.createOrdenation returns null', async () => {
    presenter.createOrdenation.mockReturnValue(null)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should return all orders', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(orders)
  })
})
