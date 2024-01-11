import { ISchemaValidator, IUUIDGenerator } from '../../interfaces'
import { mock } from 'jest-mock-extended'
import { CreateProductUseCase } from './create-product.use-case'
import MockDate from 'mockdate'
import { MissingParamError, InvalidParamError, ServerError } from '@/infra/shared'
import { ICreateProductGateway } from '@/application/interfaces/gateways/product/create-product-gateway.interface'

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase

  const schemaValidator = mock<ISchemaValidator>()
  const uuidGenerator = mock<IUUIDGenerator>()
  const gateway = mock<ICreateProductGateway>()

  beforeEach(() => {
    jest.resetAllMocks()
    createProductUseCase = new CreateProductUseCase(
      schemaValidator,
      uuidGenerator,
      gateway
    )
    uuidGenerator.generate.mockReturnValue('anyUUID')
  })

  beforeAll(() => {
    MockDate.set(new Date('2023-10-14T21:13:42.281Z'))
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('execute', () => {
    const productValidInputMock = {
      name: 'CocaCola',
      category: 'drink',
      price: 6,
      description: 'beverage',
      image: 'url'
    }

    const productInvalidInputMock = {
      category: 'drink',
      price: 6,
      description: 'beverage',
      image: 'url'
    }

    const productInvalidSchemaInputMock = {
      name: 'CocaCola',
      category: 'drink',
      price: 6,
      description: 3,
      image: 'url'
    }

    const productInvalidCategoryInputMock = {
      name: 'CocaCola',
      category: 'wrong',
      price: 6,
      description: 'beverage',
      image: 'url'
    }

    const productinValidPriceInputMock = {
      name: 'CocaCola',
      category: 'drink',
      price: -1,
      description: 'beverage',
      image: 'url'
    }

    const productInvalidStringPriceInputMock = {
      name: 'CocaCola',
      category: 'drink',
      price: '12',
      description: 'beverage',
      image: 'url'
    }

    test('should call validateSchema once with correct product input', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productValidInputMock
      })
      gateway.saveProduct.mockResolvedValue('productId')
      await createProductUseCase.execute(productValidInputMock)

      expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
      expect(schemaValidator.validate).toHaveBeenCalledWith({
        schema: 'productSchema',
        data: productValidInputMock
      })
    })

    test('should call gateway.saveProduct once with correct product input', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productValidInputMock
      })
      gateway.saveProduct.mockResolvedValue('productId')
      await createProductUseCase.execute(productValidInputMock)

      expect(gateway.saveProduct).toHaveBeenCalledTimes(1)
      expect(gateway.saveProduct).toHaveBeenCalledWith({
        ...productValidInputMock,
        id: 'anyUUID',
        createdAt: new Date('2023-10-14T21:13:42.281Z')
      })
    })

    test('should call UUIDGenerator', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productValidInputMock
      })
      gateway.saveProduct.mockResolvedValue('productId')
      await createProductUseCase.execute(productValidInputMock)

      expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
    })

    test('should throw error if validateRequiredInput returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidInputMock
      })

      const output = createProductUseCase.execute(
        productInvalidInputMock as any
      )

      await expect(output).rejects.toThrowError(
        new MissingParamError('product name')
      )
    })

    test('should throw error if validateSchema returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidSchemaInputMock,
        error: 'error'
      })

      const output = createProductUseCase.execute(
        productInvalidSchemaInputMock as any
      )

      await expect(output).rejects.toThrowError(new InvalidParamError('error'))
    })

    test('should throw error if validateCategory returns error', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidCategoryInputMock
      })

      const output = createProductUseCase.execute(
        productInvalidCategoryInputMock
      )

      await expect(output).rejects.toThrowError(
        new InvalidParamError('invalid product category')
      )
    })

    test('should throw error if validatePrice returns error - price below zero', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productinValidPriceInputMock
      })

      const output = createProductUseCase.execute(productinValidPriceInputMock)

      await expect(output).rejects.toThrowError(
        new InvalidParamError('price must be greater than zero')
      )
    })

    test('should throw error if validatePrice returns error - price as string', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productInvalidStringPriceInputMock
      })

      const output = createProductUseCase.execute(productInvalidStringPriceInputMock as any)

      await expect(output).rejects.toThrowError(
        new InvalidParamError('invalid price')
      )
    })

    test('should throw error if gateway.saveProduct returns null', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productValidInputMock
      })
      gateway.saveProduct.mockResolvedValue('')

      const output = createProductUseCase.execute(productValidInputMock)

      await expect(output).rejects.toThrowError(new ServerError())
    })

    test('should create product when input is valid', async () => {
      schemaValidator.validate.mockReturnValue({
        value: productValidInputMock
      })
      gateway.saveProduct.mockResolvedValue('productId')

      const output = await createProductUseCase.execute(productValidInputMock)

      expect(output).toEqual({ productId: 'productId' })
    })
  })
})
