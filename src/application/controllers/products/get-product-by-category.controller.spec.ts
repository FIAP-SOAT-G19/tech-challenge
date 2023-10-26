import { HttpRequest } from '@/shared/types/http.types'
import { mock } from 'jest-mock-extended'
import { serverError } from '@/shared/helpers/http.helper'
import {
  InvalidParamError,
  ProductNotFoundError
} from '@/shared/errors'
import { IGetProductByCategoryUseCase } from '@/ports/usecases/product/get-product-by-category.port'
import { GetProductByCategoryController } from './get-product-by-category.controller'

const getProductByCategoryUseCase = mock<IGetProductByCategoryUseCase>()
const productMock = [
  {
    id: 'productId',
    name: 'Coca Cola',
    category: 'drink',
    price: 6,
    description: 'description',
    image: 'url'
  }
]

describe('GetProductByCategoryController', () => {
  let getProductByCategoryController: GetProductByCategoryController
  let input: HttpRequest

  beforeAll(() => {
    getProductByCategoryController = new GetProductByCategoryController(
      getProductByCategoryUseCase
    )
    getProductByCategoryUseCase.execute.mockResolvedValue(productMock)
  })

  beforeEach(() => {
    input = {
      params: {
        category: 'drink'
      }
    }
  })
  describe('GET /products/:category', () => {
    test('should execute GetProductByCategoryUseCase once and with valid input', async () => {
      await getProductByCategoryController.execute(input)

      expect(getProductByCategoryUseCase.execute).toHaveBeenCalledTimes(1)
      expect(getProductByCategoryUseCase.execute).toHaveBeenCalledWith(
        input.params.category
      )
    })

    test('should return products data on success', async () => {
      const output = await getProductByCategoryController.execute(input)

      expect(output).toEqual({
        statusCode: 200,
        body: [
          {
            id: 'productId',
            name: 'Coca Cola',
            category: 'drink',
            price: 6,
            description: 'description',
            image: 'url'
          }
        ]
      })
    })

    test('should return a product not found error if GetProductByCategoryUseCase throws error', async () => {
      const error = new ProductNotFoundError()
      getProductByCategoryUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await getProductByCategoryController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'NotFoundError',
          message: 'Product not found error'
        }
      })
    })

    test('should return a invalid param error if GetProductByCategoryUseCase throws error', async () => {
      const error = new InvalidParamError('param')
      getProductByCategoryUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await getProductByCategoryController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'InvalidParamError',
          message: 'Invalid param: param'
        }
      })
    })

    test('should return a server error if GetProductByCategoryUseCase throws error', async () => {
      const error = new Error('Internal server error')
      getProductByCategoryUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await getProductByCategoryController.execute(input)

      expect(output).toEqual(serverError(error))
    })
  })
})
