import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { ISchemaValidator } from '../../../ports'
import { mock } from 'jest-mock-extended'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '../../../shared/errors'
import { DeleteProductUseCase } from './delete-product.use-case'

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const productRepository = mock<ProductRepository>()

  beforeEach(() => {
    jest.resetAllMocks()
    deleteProductUseCase = new DeleteProductUseCase(
      schemaValidator,
      productRepository
    )
  })

  describe('execute', () => {
    const productIdMock = 'productId'

    const productIdInvalidMock = 1

    test('should call validateSchema once with correct productId', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.delete.mockResolvedValue(true)
      await deleteProductUseCase.execute(productIdMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'deleteProductSchema',
        data: productIdMock
      })
    })

    test('should call productRepository.delete once with correct productId', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.delete.mockResolvedValue(true)
      await deleteProductUseCase.execute(productIdMock)

      expect(productRepository.delete).toHaveBeenCalledTimes(1)
      expect(productRepository.delete).toHaveBeenCalledWith(productIdMock)
    })

    test('should throw error if validateSchema returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productIdInvalidMock as any,
        error: 'error'
      })

      const output = deleteProductUseCase.execute(productIdInvalidMock as any)

      await expect(output).rejects.toThrowError(new InvalidParamError('error'))
    })

    test('should throw error if validateProductId returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })

      const output = deleteProductUseCase.execute('')

      await expect(output).rejects.toThrowError(
        new MissingParamError('product id')
      )
    })

    test('should throw error if productRepository.delete returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.delete.mockResolvedValue(false)

      const output = deleteProductUseCase.execute(productIdMock)

      await expect(output).rejects.toThrowError(new ServerError())
    })

    test('should delete product when input is valid', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      productRepository.delete.mockResolvedValue(true)

      const output = await deleteProductUseCase.execute(productIdMock)

      expect(output).toEqual({
        message: 'Product deleted',
        productId: 'productId'
      })
    })
  })
})
