
import { ICreateOrderUseCase } from '@/ports/usecases/order/create-order-usecase.port'
import { CreateOrderUseCase } from './create-order.usecase'
import { mock } from 'jest-mock-extended'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'

const uuidGenerator = mock<IUUIDGenerator>()

describe('CreateOrderUseCase', () => {
  let sut: ICreateOrderUseCase
  let input: any

  beforeEach(() => {
    sut = new CreateOrderUseCase(uuidGenerator)
    input = {
      clientId: 'anyClientId',
      totalValue: 5000
    }
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
