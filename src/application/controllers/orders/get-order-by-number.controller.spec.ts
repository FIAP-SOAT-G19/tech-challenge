import { HttpRequest } from '@/shared/types/http.types'
import { GetOrderByNumberController } from './get-order-by-number.controller'
import { mock } from 'jest-mock-extended'
import { IGetOrderByNumberUseCase } from '@/ports/usecases/order/get-order-by-number.port'
import { OrderOutput } from '@/domain/types/orders.types'
import { serverError, success } from '@/shared/helpers/http.helper'

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

  test('should return 500 if GetOrderByNumberUseCase throws an exception', async () => {
    const error = new Error('Any ERROR')

    getOrderByNumberUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })
})