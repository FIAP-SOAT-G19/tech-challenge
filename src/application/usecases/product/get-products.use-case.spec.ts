import { mock } from 'jest-mock-extended'
import { GetProductsUseCase } from './get-products.use-case'
import { ServerError } from '@/infra/shared'
import { IGetProductsGateway } from '@/application/interfaces/gateways/product/get-products-gateway.interface'

describe('GetProductsUseCase', () => {
  let getProductsUseCase: GetProductsUseCase

  const gateway = mock<IGetProductsGateway>()

  beforeEach(() => {
    jest.resetAllMocks()
    getProductsUseCase = new GetProductsUseCase(gateway)
  })

  describe('execute', () => {
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

    test('should call gateway.getProducts once', async () => {
      gateway.getProducts.mockResolvedValue(productsMock)
      await getProductsUseCase.execute()

      expect(gateway.getProducts).toHaveBeenCalledTimes(1)
    })

    test('should throw error if gateway.getProducts returns null', async () => {
      gateway.getProducts.mockResolvedValue(null as any)

      const output = getProductsUseCase.execute()

      await expect(output).rejects.toThrowError(new ServerError())
    })

    test('should get products', async () => {
      gateway.getProducts.mockResolvedValue(productsMock)

      const output = await getProductsUseCase.execute()

      expect(output).toEqual([
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
      ])
    })

    test('should get products and return empty array', async () => {
      gateway.getProducts.mockResolvedValue([])

      const output = await getProductsUseCase.execute()

      expect(output).toEqual([])
    })
  })
})
