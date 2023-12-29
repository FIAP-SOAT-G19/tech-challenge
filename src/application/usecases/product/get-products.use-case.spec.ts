import { mock } from 'jest-mock-extended'
import { GetProductsUseCase } from './get-products.use-case'
import { ProductRepository } from '@/infra/database/repositories/product.repository'
import { ServerError } from '@/infra/shared'

describe('GetProductsUseCase', () => {
  let getProductsUseCase: GetProductsUseCase

  const productRepository = mock<ProductRepository>()

  beforeEach(() => {
    jest.resetAllMocks()
    getProductsUseCase = new GetProductsUseCase(productRepository)
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

    test('should call productRepository.getAll once', async () => {
      productRepository.getAll.mockResolvedValue(productsMock)
      await getProductsUseCase.execute()

      expect(productRepository.getAll).toHaveBeenCalledTimes(1)
    })

    test('should throw error if productRepository.getAll returns null', async () => {
      productRepository.getAll.mockResolvedValue(null as any)

      const output = getProductsUseCase.execute()

      await expect(output).rejects.toThrowError(new ServerError())
    })

    test('should get products', async () => {
      productRepository.getAll.mockResolvedValue(productsMock)

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
      productRepository.getAll.mockResolvedValue([])

      const output = await getProductsUseCase.execute()

      expect(output).toEqual([])
    })
  })
})
