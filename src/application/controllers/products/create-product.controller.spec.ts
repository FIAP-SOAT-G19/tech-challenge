import { HttpRequest } from '@/shared/types/http.types'
import { mock } from 'jest-mock-extended'
import { serverError } from '@/shared/helpers/http.helper'
import { ICreateProductUseCase } from '@/ports/usecases/product/create-product.port'
import { CreateProductController } from './create-product.controller'

const createProductUseCase = mock<ICreateProductUseCase>()

describe('CreateProductController', () => {
  let createProductController: CreateProductController
  let input: HttpRequest

  beforeAll(() => {
    createProductController = new CreateProductController(createProductUseCase)
    createProductUseCase.execute.mockResolvedValue('productId')
  })

  beforeEach(() => {
    input = {
      body: {
        name: 'Coca Cola',
        category: 'drink',
        price: 6,
        description: 'description',
        image: 'url'
      }
    }
  })
  describe('POST /products', () => {
    test('should execute CreateProductUseCase once and with valid input', async () => {
      await createProductController.execute(input)

      expect(createProductUseCase.execute).toHaveBeenCalledTimes(1)
      expect(createProductUseCase.execute).toHaveBeenCalledWith(input.body)
    })

    test('should return a productId on success', async () => {
      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 201,
        body: { productId: 'productId' }
      })
    })

    test('should return a properly missing name error', async () => {
      input.body.name = null
      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: product name'
        }
      })
    })

    test('should return a properly missing category error', async () => {
      input.body.category = null
      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: product category'
        }
      })
    })

    test('should return a properly missing price error', async () => {
      input.body.price = null
      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: product price'
        }
      })
    })

    test('should return a properly missing description error', async () => {
      input.body.description = null
      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: product description'
        }
      })
    })

    test('should return a properly missing image error', async () => {
      input.body.image = null
      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: product image'
        }
      })
    })

    test('should return an error if CreateProductUseCase throws error', async () => {
      const error = new Error('Internal server error')
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await createProductController.execute(input)

      expect(output).toEqual(serverError(error))
    })
  })
})
