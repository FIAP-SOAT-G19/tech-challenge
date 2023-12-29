import { mock } from 'jest-mock-extended'
import { UpdateProductController } from './update-product.controller'
import { IUpdateProductUseCase } from '@/application/interfaces'
import { HttpRequest, MissingParamError, InvalidParamError, ProductNotFoundError, ServerError } from '@/infra/shared'

const updateProductUseCase = mock<IUpdateProductUseCase>()
const productMock = {
  id: 'productId',
  name: 'Coca Cola',
  category: 'drink',
  price: 6,
  description: 'description',
  image: 'url'
}

describe('UpdateProductController', () => {
  let updateProductController: UpdateProductController
  let input: HttpRequest

  beforeAll(() => {
    updateProductController = new UpdateProductController(updateProductUseCase)
    updateProductUseCase.execute.mockResolvedValue(productMock)
  })

  beforeEach(() => {
    input = {
      params: {
        productId: 'productId'
      },
      body: {
        name: 'Coca Cola',
        category: 'drink',
        price: 6,
        description: 'description',
        image: 'url'
      }
    }
  })
  describe('PATCH /products/:productId', () => {
    test('should execute UpdateProductUseCase once and with valid input', async () => {
      await updateProductController.execute(input)

      expect(updateProductUseCase.execute).toHaveBeenCalledTimes(1)
      expect(updateProductUseCase.execute).toHaveBeenCalledWith(
        {
          id: input.params.productId,
          name: input.body.name,
          category: input.body.category,
          price: input.body.price,
          description: input.body.description,
          image: input.body.image
        }
      )
    })

    test('should return product info on success', async () => {
      const output = await updateProductController.execute(input)

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

    test('should return a properly missing id error', async () => {
      const error = new MissingParamError('product id')
      updateProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await updateProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: product id'
        }
      })
    })

    test('should return a properly invalid param error', async () => {
      const error = new InvalidParamError('param')
      updateProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await updateProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'InvalidParamError',
          message: 'Invalid param: param'
        }
      })
    })

    test('should return a properly invalid param error', async () => {
      const error = new ProductNotFoundError()
      updateProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await updateProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'NotFoundError',
          message: 'Product not found error'
        }
      })
    })

    test('should return an error if UpdateProductUseCase throws error', async () => {
      const error = new ServerError()
      updateProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await updateProductController.execute(input)

      expect(output).toEqual({
        statusCode: 500,
        body: {
          error: 'ServerError',
          message: 'Internal server error'
        }
      })
    })
  })
})
