import { HttpRequest } from '@/shared/types/http.types'
import { CreateOrderController } from './create-order.controller'
import { mock } from 'jest-mock-extended'
import { ICreateOrderUseCase } from '@/ports'
import { serverError, success } from '@/shared/helpers/http.helper'

const createOrderUseCase = mock<ICreateOrderUseCase>()

describe('CreateOrderController', () => {
  let sut: CreateOrderController
  let input: HttpRequest

  beforeAll(() => {
    sut = new CreateOrderController(createOrderUseCase)
    input = {
      body: {
        clientId: 'anyClientId',
        products: [{
          id: 'anyProductId',
          name: 'AnyProductName',
          category: 'anyProductCategory',
          price: 2500,
          description: 'anyProductDescription',
          image: 'anyProductImageUrl',
          amount: 1
        }, {
          id: 'anyAnotherProductId',
          name: 'AnyAnotherProductName',
          category: 'anyAnotherProductCategory',
          price: 1000,
          description: 'anyAnotherProductDescription',
          image: 'anyAnotherProductImageUrl',
          amount: 1
        }]
      }
    }
    createOrderUseCase.execute.mockResolvedValue({ orderNumber: 'anyOrderNumber' })
  })

  test('should call CreateOrderUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(createOrderUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createOrderUseCase.execute).toHaveBeenCalledWith(input.body)
  })

  test('should return a orderId on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(201, { orderNumber: 'anyOrderNumber' }))
  })

  test('should return an error if CreateOrderUseCase throws', async () => {
    const error = new Error('Internal server error')
    createOrderUseCase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })
})
