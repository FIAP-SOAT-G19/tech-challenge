import { ISchemaValidator } from '../../interfaces'
import { mock } from 'jest-mock-extended'
import { GetProductByCategoryUseCase } from './get-product-by-category'
import { ProductRepository } from '@/infra/database/repositories/product.repository'
import { InvalidParamError, ProductNotFoundError } from '@/infra/shared'

describe('GetProductByCategoryUseCase', () => {
  let getProductByCategoryUseCase: GetProductByCategoryUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const productRepository = mock<ProductRepository>()

  beforeEach(() => {
    jest.resetAllMocks()
    getProductByCategoryUseCase = new GetProductByCategoryUseCase(
      schemaValidator,
      productRepository
    )
  })

  describe('execute', () => {
    const productCategoryMock = 'drink'

    const productCategoryInvalidMock = 1

    const productMock = [
      {
        id: '1',
        name: 'Coca Cola',
        category: 'drink'
      }
    ]

    test('should call validateSchema once with correct category', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productCategoryMock }
      })
      productRepository.getByCategory.mockResolvedValue(productMock)
      await getProductByCategoryUseCase.execute(productCategoryMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'getProductSchema',
        data: productCategoryMock
      })
    })

    test('should call productRepository.getByCategory once with correct category', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productCategoryMock }
      })
      productRepository.getByCategory.mockResolvedValue(productMock)
      await getProductByCategoryUseCase.execute(productCategoryMock)

      expect(productRepository.getByCategory).toHaveBeenCalledTimes(1)
      expect(productRepository.getByCategory).toHaveBeenCalledWith(
        productCategoryMock
      )
    })

    test('should throw error if validateSchema returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productCategoryInvalidMock as any,
        error: 'error'
      })

      const output = getProductByCategoryUseCase.execute(
        productCategoryInvalidMock as any
      )

      await expect(output).rejects.toThrowError(new InvalidParamError('error'))
    })

    test('should throw error if validateCategory returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productCategoryMock }
      })

      const output = getProductByCategoryUseCase.execute('invalid')

      await expect(output).rejects.toThrowError(
        new InvalidParamError('invalid product category')
      )
    })

    test('should throw error if productRepository.getByCategory returns null', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productCategoryMock }
      })
      productRepository.getByCategory.mockResolvedValue(null)

      const output = getProductByCategoryUseCase.execute(productCategoryMock)

      await expect(output).rejects.toThrowError(new ProductNotFoundError())
    })

    test('should get product when input is valid', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productCategoryMock }
      })
      productRepository.getByCategory.mockResolvedValue(productMock)

      const output = await getProductByCategoryUseCase.execute(
        productCategoryMock
      )

      expect(output).toEqual([
        {
          id: '1',
          name: 'Coca Cola',
          category: 'drink'
        }
      ])
    })
  })
})
