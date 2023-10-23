import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { ISchemaValidator } from '../../../ports'
import { mock } from 'jest-mock-extended'
import {
  InvalidParamError,
  MissingParamError,
  ServerError
} from '../../../shared/errors'
import { UpdateProductUseCase } from './update-product.use-case'

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const productRepository = mock<ProductRepository>()

  beforeEach(() => {
    jest.resetAllMocks()
    updateProductUseCase = new UpdateProductUseCase(
      schemaValidator,
      productRepository
    )
  })

  describe('execute', () => {
    const productId = 'productId'
    const productUpdatedMock = {
      id: productId,
      name: 'CocaCola',
      category: 'drink',
      price: 6,
      description: 'beverage',
      image: 'url'
    }

    const updateNameMock = {
      name: 'CocaCola'
    }

    const productInvalidSchemaInputMock = {
      name: 'CocaCola',
      category: 'drink',
      price: 6,
      description: 3,
      image: 'url'
    }

    const productInvalidCategoryInputMock = {
      name: 'CocaCola',
      category: 'wrong',
      price: 6,
      description: 'beverage',
      image: 'url'
    }

    const productinValidPriceInputMock = {
      name: 'CocaCola',
      category: 'drink',
      price: -1,
      description: 'beverage',
      image: 'url'
    }

    test('should call validateSchema once with correct product input', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      productRepository.update.mockResolvedValue(productUpdatedMock)
      await updateProductUseCase.execute(productId, updateNameMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'updateProductSchema',
        data: updateNameMock
      })
    })

    test('should call productRepository.update once with correct product input', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      productRepository.update.mockResolvedValue(productUpdatedMock)
      await updateProductUseCase.execute(productId, updateNameMock)

      expect(productRepository.update).toHaveBeenCalledTimes(1)
      expect(productRepository.update).toHaveBeenCalledWith(productId, {
        ...updateNameMock
      })
    })

    test('should throw error if validateProductId returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })

      const output = updateProductUseCase.execute('', updateNameMock)

      await expect(output).rejects.toThrowError(
        new MissingParamError('product id')
      )
    })

    test('should throw error if validateSchema returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidSchemaInputMock,
        error: 'error'
      })

      const output = updateProductUseCase.execute(
        productId,
        productInvalidSchemaInputMock as any
      )

      await expect(output).rejects.toThrowError(new InvalidParamError('error'))
    })

    test('should throw error if validateCategory returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidCategoryInputMock
      })

      const output = updateProductUseCase.execute(
        productId,
        productInvalidCategoryInputMock
      )

      await expect(output).rejects.toThrowError(
        new InvalidParamError('invalid product category')
      )
    })

    test('should throw error if validatePrice returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productinValidPriceInputMock
      })

      const output = updateProductUseCase.execute(
        productId,
        productinValidPriceInputMock
      )

      await expect(output).rejects.toThrowError(
        new InvalidParamError('price must be greater than zero')
      )
    })

    test('should throw error if productRepository.update returns null', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      productRepository.update.mockResolvedValue(null)

      const output = updateProductUseCase.execute(productId, updateNameMock)

      await expect(output).rejects.toThrowError(new ServerError())
    })

    test('should update product name', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      productRepository.update.mockResolvedValue(productUpdatedMock)

      const output = await updateProductUseCase.execute(
        productId,
        updateNameMock
      )

      expect(output).toEqual({
        id: 'productId',
        name: 'CocaCola',
        category: 'drink',
        price: 6,
        description: 'beverage',
        image: 'url'
      })
    })
  })
})
