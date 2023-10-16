import { HttpRequest } from '@/shared/types/http.types'
import { GetAllOrdersController } from './get-all-orders.controller'
import { mock } from 'jest-mock-extended'
import { OrderOutput } from '@/domain/types/orders.types'
import { serverError, success } from '@/shared/helpers/http.helper'
import { IGetAllOrdersUseCase } from '@/ports/usecases/order/get-all-orders.port'

const getAllOrdersUseCase = mock<IGetAllOrdersUseCase>()
const orderOutput: OrderOutput [] = [{
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
}]

describe('GetAllOrdersController', () => {
  let sut: GetAllOrdersController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetAllOrdersController(getAllOrdersUseCase)
    input = {
      query: {
        status: 'waitingPayment',
        clientId: 'anyClientId'
      }
    }
    getAllOrdersUseCase.execute.mockResolvedValue(orderOutput)
  })

  test('should call getAllOrdersUseCase once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(getAllOrdersUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getAllOrdersUseCase.execute).toHaveBeenCalledWith(input.query)
  })

  test('should return 200 and corrects orders', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(200, orderOutput))
  })

  test('should return null if getAllOrdersUseCase returns null', async () => {
    getAllOrdersUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual(success(200, null))
  })

  test('should return 500 if getAllOrdersUseCase throws an exception', async () => {
    const error = new Error('Any ERROR')

    getAllOrdersUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })
})
