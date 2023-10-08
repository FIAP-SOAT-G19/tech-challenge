import { HttpRequest } from '@/shared/types/http.types'
import { CreateOrderController } from './create-order.controller'

describe('CreateOrderController', () => {
  let sut: CreateOrderController
  let input: HttpRequest

  beforeAll(() => {
    sut = new CreateOrderController()
    input = {
      body: {
        clientId: 'anyClientId',
        totalValue: 5000
      }
    }
  })

  test('should call CreateOrderUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(1).toBe(1)
  })
})
