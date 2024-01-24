import { ISchemaValidator } from '../../interfaces'
import { mock } from 'jest-mock-extended'
import { UpdateProductUseCase } from './update-product.use-case'
import { MissingParamError, InvalidParamError, ServerError } from '@/infra/shared'
import { IUpdateProductGateway } from '@/application/interfaces/gateways/product/update-product-gateway.interface'

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const gateway = mock<IUpdateProductGateway>()

  beforeEach(() => {
    jest.resetAllMocks()
    updateProductUseCase = new UpdateProductUseCase(
      schemaValidator,
      gateway
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
      id: 'productId',
      name: 'CocaCola'
    }

    const updateInvalidIdNameMock = {
      id: '',
      name: 'CocaCola'
    }

    const productInvalidSchemaInputMock = {
      id: 'productId',
      name: 'CocaCola',
      category: 'drink',
      price: 6,
      description: 3,
      image: 'url'
    }

    const productInvalidCategoryInputMock = {
      id: 'productId',
      name: 'CocaCola',
      category: 'wrong',
      price: 6,
      description: 'beverage',
      image: 'url'
    }

    const productinValidPriceInputMock = {
      id: 'productId',
      name: 'CocaCola',
      category: 'drink',
      price: -1,
      description: 'beverage',
      image: 'url'
    }

    const productInvalidStringPriceInputMock = {
      id: 'productId',
      name: 'CocaCola',
      category: 'drink',
      price: '12',
      description: 'beverage',
      image: 'url'
    }

    test('should call validateSchema once with correct product input', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      gateway.updateProduct.mockResolvedValue(productUpdatedMock)
      await updateProductUseCase.execute(updateNameMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'updateProductSchema',
        data: updateNameMock
      })
    })

    test('should call gateway.updateProduct once with correct product input', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      gateway.updateProduct.mockResolvedValue(productUpdatedMock)
      await updateProductUseCase.execute(updateNameMock)

      expect(gateway.updateProduct).toHaveBeenCalledTimes(1)
      expect(gateway.updateProduct).toHaveBeenCalledWith({
        ...updateNameMock
      })
    })

    test('should throw error if validateProductId returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })

      const output = updateProductUseCase.execute(updateInvalidIdNameMock)

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
        productInvalidSchemaInputMock as any
      )

      await expect(output).rejects.toThrowError(new InvalidParamError('error'))
    })

    test('should throw error if validateCategory returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidCategoryInputMock
      })

      const output = updateProductUseCase.execute(
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

      const output = updateProductUseCase.execute(productinValidPriceInputMock)

      await expect(output).rejects.toThrowError(
        new InvalidParamError('price must be greater than zero')
      )
    })

    test('should throw error if validatePrice returns error - price as string', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidStringPriceInputMock
      })

      const output = updateProductUseCase.execute(productInvalidStringPriceInputMock as any)

      await expect(output).rejects.toThrowError(
        new InvalidParamError('invalid price')
      )
    })

    test('should throw error if gateway.updateProduct returns null', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      gateway.updateProduct.mockResolvedValue(null)

      const output = updateProductUseCase.execute(updateNameMock)

      await expect(output).rejects.toThrowError(new ServerError())
    })

    test('should update product name', async () => {
      schemaValidator.validate.mockReturnValue({
        value: updateNameMock
      })
      gateway.updateProduct.mockResolvedValue(productUpdatedMock)

      const output = await updateProductUseCase.execute(updateNameMock)

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
