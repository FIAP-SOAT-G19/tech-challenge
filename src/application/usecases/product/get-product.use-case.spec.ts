import { IGetProductByIdGateway } from '@/application/interfaces/gateways/product/get-product-by-id-gateway.interface'
import { ISchemaValidator } from '../../interfaces'
import { GetProductUseCase } from './get-product.use-case'
import { InvalidParamError, MissingParamError, ProductNotFoundError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'

describe('GetProductUseCase', () => {
  let getProductUseCase: GetProductUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const gateway = mock<IGetProductByIdGateway>()

  beforeEach(() => {
    jest.resetAllMocks()
    getProductUseCase = new GetProductUseCase(
      schemaValidator,
      gateway
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
      gateway.getProductById.mockResolvedValue(productMock)
      await getProductUseCase.execute(productIdMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'getProductSchema',
        data: productIdMock
      })
    })

    test('should call gateway.getProductById once with correct productId', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      gateway.getProductById.mockResolvedValue(productMock)
      await getProductUseCase.execute(productIdMock)

      expect(gateway.getProductById).toHaveBeenCalledTimes(1)
      expect(gateway.getProductById).toHaveBeenCalledWith(productIdMock)
    })

    test('should throw error if validateSchema returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productIdInvalidMock as any,
        error: 'error'
      })

      const output = getProductUseCase.execute(productIdInvalidMock as any)

      await expect(output).rejects.toThrowError(new InvalidParamError('error'))
    })

    test('should throw error if validateProductId returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })

      const output = getProductUseCase.execute('')

      await expect(output).rejects.toThrowError(new MissingParamError('product id'))
    })

    test('should throw error if gateway.getProductById returns null', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      gateway.getProductById.mockResolvedValue(null)

      const output = getProductUseCase.execute(productIdMock)

      await expect(output).rejects.toThrowError(new ProductNotFoundError())
    })

    test('should get product when input is valid', async () => {
      schemaValidator.validate.mockReturnValue({
        value: { productIdMock }
      })
      gateway.getProductById.mockResolvedValue(productMock)

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
