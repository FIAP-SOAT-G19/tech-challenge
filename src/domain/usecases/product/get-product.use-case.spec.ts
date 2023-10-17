import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { ISchemaValidator } from '../../../ports'
import { mock } from 'jest-mock-extended'
import { InvalidParamError, ProductNotFoundError } from '../../../shared/errors'
import { GetProductUseCase } from './get-product.use-case'

describe('GetProductUseCase', () => {
  let getProductUseCase: GetProductUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const productRepository = mock<ProductRepository>()

  beforeEach(() => {
    jest.resetAllMocks()
    getProductUseCase = new GetProductUseCase(
      schemaValidator,
      productRepository
    )
  })

  describe('execute', () => {
    const productIdMock = '1'

    const productIdInvalidMock = 1

    const productMock = {
      id: '1',
      name: 'Coca Cola',
      category: 'drink',
      price: 6,
      description: 'description',
      image: 'url'
    }

    test('should call validateSchema once with correct productId', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.getById.mockResolvedValue(productMock)
      await getProductUseCase.execute(productIdMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'getProductSchema',
        data: productIdMock
      })
    })

    test('should call productRepository.getById once with correct productId', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.getById.mockResolvedValue(productMock)
      await getProductUseCase.execute(productIdMock)

      expect(productRepository.getById).toHaveBeenCalledTimes(1)
      expect(productRepository.getById).toHaveBeenCalledWith(productIdMock)
    })

    test('should throw error if validateSchema returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productIdInvalidMock as any,
        error: 'error'
      })

      const output = getProductUseCase.execute(
        productIdInvalidMock as any
      )

      await expect(output).rejects.toThrowError(new InvalidParamError('error'))
    })

    test('should throw error if productRepository.getById returns null', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.getById.mockResolvedValue(null)

      const output = getProductUseCase.execute(productIdMock)

      await expect(output).rejects.toThrowError(new ProductNotFoundError())
    })

    test('should get product when input is valid', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.getById.mockResolvedValue(productMock)

      const output = await getProductUseCase.execute(productIdMock)

      expect(output).toEqual({
        id: '1',
        name: 'Coca Cola',
        category: 'drink',
        price: 6,
        description: 'description',
        image: 'url'
      })
    })
  })
})
