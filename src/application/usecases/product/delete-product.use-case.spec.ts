import { IDeleteProductGateway } from '@/application/interfaces/gateways/product/delete-product-gateway.interface'
import { ISchemaValidator } from '../../interfaces'
import { DeleteProductUseCase } from './delete-product.use-case'
import { InvalidParamError, MissingParamError, ServerError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const gateway = mock<IDeleteProductGateway>()

  beforeEach(() => {
    jest.resetAllMocks()
    deleteProductUseCase = new DeleteProductUseCase(
      schemaValidator,
      gateway
    )
  })

  describe('execute', () => {
    const productIdMock = 'productId'

    const productIdInvalidMock = 1

    test('should call validateSchema once with correct productId', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      gateway.deleteProduct.mockResolvedValue(true)
      await deleteProductUseCase.execute(productIdMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'deleteProductSchema',
        data: productIdMock
      })
    })

    test('should call gateway.deleteProduct once with correct productId', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      gateway.deleteProduct.mockResolvedValue(true)
      await deleteProductUseCase.execute(productIdMock)

      expect(gateway.deleteProduct).toHaveBeenCalledTimes(1)
      expect(gateway.deleteProduct).toHaveBeenCalledWith(productIdMock)
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

    test('should throw error if gateway.deleteProduct returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      gateway.deleteProduct.mockResolvedValue(false)

      const output = deleteProductUseCase.execute(productIdMock)

      await expect(output).rejects.toThrowError(new ServerError())
    })

    test('should delete product when input is valid', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      gateway.deleteProduct.mockResolvedValue(true)

      const output = await deleteProductUseCase.execute(productIdMock)

      expect(output).toEqual({
        message: 'Product deleted',
        productId: 'productId'
      })
    })
  })
})
