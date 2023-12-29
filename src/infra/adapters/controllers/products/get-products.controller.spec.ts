import { mock } from 'jest-mock-extended'
import { GetProductsController } from './get-products.controller'
import { IGetProductsUseCase } from '@/application/interfaces'
import { serverError } from '@/infra/shared'

const getProductsUseCase = mock<IGetProductsUseCase>()
const productsMock = [
  {
    id: '1',
    name: 'Coca Cola',
    category: 'drink'
  },
  {
    id: '2',
    name: 'Fanta Uva',
    category: 'drink'
  }
]

describe('GetProductsController', () => {
  let getProductsController: GetProductsController

  beforeAll(() => {
    getProductsController = new GetProductsController(getProductsUseCase)
    getProductsUseCase.execute.mockResolvedValue(productsMock)
  })

  describe('GET /products', () => {
    test('should execute GetProductsUseCase once', async () => {
      await getProductsController.execute()

      expect(getProductsUseCase.execute).toHaveBeenCalledTimes(1)
    })

    test('should return a products data on success', async () => {
      const output = await getProductsController.execute()

      expect(output).toEqual({
        statusCode: 200,
        body: [
          {
            id: '1',
            name: 'Coca Cola',
            category: 'drink'
          },
          {
            id: '2',
            name: 'Fanta Uva',
            category: 'drink'
          }
        ]
      })
    })

    test('should return a server error if GetProductsUseCase throws error', async () => {
      const error = new Error('Internal server error')
      getProductsUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await getProductsController.execute()

      expect(output).toEqual(serverError(error))
    })
  })
})
