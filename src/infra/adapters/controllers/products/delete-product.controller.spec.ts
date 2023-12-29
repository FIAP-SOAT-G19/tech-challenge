import { mock } from 'jest-mock-extended'
import { DeleteProductController } from './delete-product.controller'
import { IDeleteProductUseCase } from '@/application/interfaces'
import { HttpRequest, ProductNotFoundError, InvalidParamError, MissingParamError, serverError } from '@/infra/shared'

const deleteProductUseCase = mock<IDeleteProductUseCase>()
const deletedMock = {
  message: 'Product deleted',
  productId: 'productId'
}

describe('DeleteProductController', () => {
  let deleteProductController: DeleteProductController
  let input: HttpRequest

  beforeAll(() => {
    deleteProductController = new DeleteProductController(deleteProductUseCase)
    deleteProductUseCase.execute.mockResolvedValue(deletedMock)
  })

  beforeEach(() => {
    input = {
      params: {
        productId: 'productId'
      }
    }
  })
  describe('DELETE /products/:productId', () => {
    test('should execute DeleteProductUseCase once and with valid input', async () => {
      await deleteProductController.execute(input)

      expect(deleteProductUseCase.execute).toHaveBeenCalledTimes(1)
      expect(deleteProductUseCase.execute).toHaveBeenCalledWith(
        input.params.productId
      )
    })

    test('should return a deleted message on success', async () => {
      const output = await deleteProductController.execute(input)

      expect(output).toEqual({
        statusCode: 200,
        body: deletedMock
      })
    })

    test('should return a product not found error if DeleteProductUseCase throws error', async () => {
      const error = new ProductNotFoundError()
      deleteProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await deleteProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'NotFoundError',
          message: 'Product not found error'
        }
      })
    })

    test('should return a invalid param error if DeleteProductUseCase throws error', async () => {
      const error = new InvalidParamError('param')
      deleteProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await deleteProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'InvalidParamError',
          message: 'Invalid param: param'
        }
      })
    })

    test('should return a invalid param error if DeleteProductUseCase throws error', async () => {
      const error = new MissingParamError('id')
      deleteProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await deleteProductController.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: {
          error: 'MissingParamError',
          message: 'Missing param: id'
        }
      })
    })

    test('should return a server error if DeleteProductUseCase throws error', async () => {
      const error = new Error('Internal server error')
      deleteProductUseCase.execute.mockImplementationOnce(() => {
        throw error
      })

      const output = await deleteProductController.execute(input)

      expect(output).toEqual(serverError(error))
    })
  })
})
