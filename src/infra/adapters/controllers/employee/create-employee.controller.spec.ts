import { ISchemaValidator, IUUIDGenerator } from '@/application/interfaces'
import { IEmployeeRepository } from '@/application/interfaces/repositories/employee.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { CreateEmployeeUseCase } from '@/application/usecases/employee/create-employee.usecase'
import { ServerError } from '@/infra/shared'
import { CreateEmployeeController } from './create-employee.controller'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const employeeRepository = mock<IEmployeeRepository>()
const schemaValidator = mock<ISchemaValidator>()
const uuidGenerator = mock<IUUIDGenerator>()
const encryptoPassword = mock<IEncrypt>()

describe('CreateEmployeeController', () => {
  let sut: CreateEmployeeController
  let createEmployeeUseCase: CreateEmployeeUseCase
  let input: any

  beforeEach(() => {
    createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository, schemaValidator, uuidGenerator, encryptoPassword)
    sut = new CreateEmployeeController(createEmployeeUseCase)
    input = {
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123'
    }
    uuidGenerator.generate.mockReturnValue('generatedUUID')
    schemaValidator.validate.mockReturnValue({ value: input })
    employeeRepository.findByCpf.mockResolvedValue(null)
    employeeRepository.findByEmail.mockResolvedValue(null)
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should create an employee with valid input', async () => {
    employeeRepository.create.mockResolvedValue('generatedUUID')

    const result = await sut.execute({ body: input })

    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual({ idEmployee: 'generatedUUID' })
  })

  test('should throw InvalidParamError for duplicate email', async () => {
    employeeRepository.findByEmail.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    const result = await sut.execute({ body: input })

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      error: 'InvalidParamError',
      message: 'Invalid param: Email already in use'
    })
  })

  test('should throw InvalidParamError for duplicate cpf', async () => {
    employeeRepository.findByCpf.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    const result = await sut.execute({ body: input })

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      error: 'InvalidParamError',
      message: 'Invalid param: CPF already in use'
    })
  })

  test('should throw SchemaValidationError for invalid input', async () => {
    const inputInvalid = {
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '12345',
      password: 'password123'
    }
    schemaValidator.validate.mockReturnValue({
      value: {
        message: '"cpf" length must be 11 characters long'
      },
      error: 'SchemaValidationError'
    })
    const result = await sut.execute({ body: inputInvalid })

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      error: 'SchemaValidationError',
      message: undefined
    })
  })

  test('should throw ServerError', async () => {
    const error = new ServerError()

    employeeRepository.create.mockRejectedValue(error)
    const result = await sut.execute({ body: input })

    expect(result.statusCode).toBe(500)
  })
})
