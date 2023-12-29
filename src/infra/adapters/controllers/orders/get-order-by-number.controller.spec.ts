import { IGetOrderByNumberUseCase } from '@/application/interfaces'
import { OrderOutput } from '@/application/usecases/order/orders.types'
import { HttpRequest, success, serverError, InvalidParamError, badRequest } from '@/infra/shared'
import { GetOrderByNumberController } from './get-order-by-number.controller'
import { mock } from 'jest-mock-extended'

const getOrderByNumberUseCase = mock<IGetOrderByNumberUseCase>()
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

describe('GetOrderByNumberController', () => {
  let sut: GetOrderByNumberController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetOrderByNumberController(getOrderByNumberUseCase)
    input = {
      params: {
        orderNumber: 'anyOrderNumber'
      }
    }
    getOrderByNumberUseCase.execute.mockResolvedValue(orderOutput)
  })

  test('should call GetOrderByNumberUseCase once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(getOrderByNumberUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getOrderByNumberUseCase.execute).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should return 200 and correct order', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(200, orderOutput))
  })

  test('should return a correct error if GetOrderByNumberUseCase throws an exception', async () => {
    const error = new Error('Any ERROR')

    getOrderByNumberUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })

  test('should return a correct error if GetOrderByNumberUseCase throws an exception', async () => {
    const error = new InvalidParamError('Any ERROR')

    getOrderByNumberUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
