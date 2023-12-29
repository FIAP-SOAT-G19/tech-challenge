import { mock } from 'jest-mock-extended'
import { CreateProductController } from './create-product.controller'
import { ICreateProductUseCase } from '@/application/interfaces'
import { HttpRequest, MissingParamError, InvalidParamError, ServerError } from '@/infra/shared'

const createProductUseCase = mock<ICreateProductUseCase>()

describe('CreateProductController', () => {
  let createProductController: CreateProductController
  let input: HttpRequest

  beforeAll(() => {
    createProductController = new CreateProductController(createProductUseCase)
    createProductUseCase.execute.mockResolvedValue({ productId: 'productId' })
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
      const error = new MissingParamError('product name')
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

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
      const error = new MissingParamError('product category')
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

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
      const error = new MissingParamError('product price')
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

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
      const error = new MissingParamError('product description')
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

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
      const error = new MissingParamError('product missing')
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: product missing'
        }
      })
    })

    test('should return a properly invalid param error', async () => {
      const error = new InvalidParamError('param')
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await createProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'InvalidParamError',
          message: 'Invalid param: param'
        }
      })
    })

    test('should return an error if CreateProductUseCase throws error', async () => {
      const error = new ServerError()
      createProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await createProductController.execute(input)

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
