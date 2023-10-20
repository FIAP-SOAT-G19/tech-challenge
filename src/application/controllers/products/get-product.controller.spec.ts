import { HttpRequest } from '@/shared/types/http.types'
import { mock } from 'jest-mock-extended'
import { serverError } from '@/shared/helpers/http.helper'
import { IGetProductUseCase } from '@/ports/usecases/product/get-product.port'
import { GetProductController } from './get-product.controller'
import { ProductNotFoundError } from '@/shared/errors'

const getProductUseCase = mock<IGetProductUseCase>()
const productMock = {
  id: 'productId',
  name: 'Coca Cola',
  category: 'drink',
  price: 6,
  description: 'description',
  image: 'url'
}

describe('GetProductController', () => {
  let getProductController: GetProductController
  let input: HttpRequest

  beforeAll(() => {
    getProductController = new GetProductController(getProductUseCase)
    getProductUseCase.execute.mockResolvedValue(productMock)
  })

  beforeEach(() => {
    input = {
      params: {
        productId: 'productId'
      }
    }
  })
  describe('GET /products/:productId', () => {
    test('should execute GetProductUseCase once and with valid input', async () => {
      await getProductController.execute(input)

      expect(getProductUseCase.execute).toHaveBeenCalledTimes(1)
      expect(getProductUseCase.execute).toHaveBeenCalledWith(input.params.productId)
    })

    test('should return a product data on success', async () => {
      const output = await getProductController.execute(input)

      expect(output).toEqual({
        statusCode: 200,
        body: {
          id: 'productId',
          name: 'Coca Cola',
          category: 'drink',
          price: 6,
          description: 'description',
          image: 'url'
        }
      })
    })

    test('should return a product not found error if GetProductUseCase throws error', async () => {
      const error = new ProductNotFoundError()
      getProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await getProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'NotFoundError',
          message: 'Product not found error'
        }
      })
    })

    test('should return a server error if GetProductUseCase throws error', async () => {
      const error = new Error('Internal server error')
      getProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await getProductController.execute(input)

      expect(output).toEqual(serverError(error))
    })
  })
})
