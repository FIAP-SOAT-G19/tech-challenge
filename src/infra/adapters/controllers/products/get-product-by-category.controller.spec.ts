import { mock } from 'jest-mock-extended'
import { GetProductByCategoryController } from './get-product-by-category.controller'
import { IGetProductByCategoryUseCase } from '@/application/interfaces'
import { HttpRequest, ProductNotFoundError, InvalidParamError, serverError } from '@/infra/shared'

const getProductByCategoryUseCase = mock<IGetProductByCategoryUseCase>()
const productMock = [
  {
    id: 'productId',
    name: 'Coca Cola',
    category: 'drink'
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
      query: {
        category: 'drink'
      }
    }
  })
  describe('GET /products?category', () => {
    test('should execute GetProductByCategoryUseCase once and with valid input', async () => {
      await getProductByCategoryController.execute(input)

      expect(getProductByCategoryUseCase.execute).toHaveBeenCalledTimes(1)
      expect(getProductByCategoryUseCase.execute).toHaveBeenCalledWith(
        input.query.category
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
            category: 'drink'
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
