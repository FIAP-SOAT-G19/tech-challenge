import { IEmployeeRepository } from '@/ports/repositories/employee.port'
import { IEncryptoPasswordGenerator } from '@/ports/usecases/encrypto-password/encrypto-password.port'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import { mock } from 'jest-mock-extended'
import { UpdateEmployeeController } from './update-employee.controller'
import { UpdateEmployeeUseCase } from '@/domain/usecases/employee/update-employee.usecase'
import { ServerError } from '@/shared/errors'

const employeeRepository = mock<IEmployeeRepository>()
const schemaValidator = mock<ISchemaValidator>()
const encryptoPassword = mock<IEncryptoPasswordGenerator>()

describe('UpdateEmployeeController', () => {
  let sut: UpdateEmployeeController
  let updateEmployeeUseCase: UpdateEmployeeUseCase
  let input: any

  beforeEach(() => {
    updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository, schemaValidator, encryptoPassword)
    sut = new UpdateEmployeeController(updateEmployeeUseCase)
    input = {
      params: {
        id: 'anyId'
      },
      body: {
        name: 'John Doe',
        email: 'anyEmail',
        cpf: '1234567890',
        password: 'password123'
      }
    }
    schemaValidator.validate.mockReturnValue({ value: input.body })
    encryptoPassword.generate.mockReturnValue('encryptedPassword')
    employeeRepository.findById.mockResolvedValue(null)
    employeeRepository.findByEmail.mockResolvedValue(null)
    employeeRepository.findByCpf.mockResolvedValue(null)
  })

  test('should update an employee with valid input', async () => {
    employeeRepository.findById.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
    employeeRepository.update.mockResolvedValue('anyId')

    const result = await sut.execute(input)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({ idEmployee: 'anyId' })
  })

  test('should throw InvalidParamError for non-existent employee', async () => {
    const result = await sut.execute(input)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      error: 'InvalidParamError',
      message: 'Invalid param: Employee not found'
    })
  })

  test('should throw InvalidParamError for duplicate email', async () => {
    employeeRepository.findById.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    employeeRepository.findByEmail.mockResolvedValue({
      id: 'anyId2',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567891',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    const result = await sut.execute(input)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      error: 'InvalidParamError',
      message: 'Invalid param: Email already in use'
    })
  })

  test('should throw InvalidParamError for duplicate cpf', async () => {
    employeeRepository.findById.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    employeeRepository.findByCpf.mockResolvedValue({
      id: 'anyId2',
      name: 'John Doe',
      email: 'anyEmaill',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    const result = await sut.execute(input)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      error: 'InvalidParamError',
      message: 'Invalid param: CPF already in use'
    })
  })

  test('should throw ServerError', async () => {
    const error = new ServerError()

    employeeRepository.findById.mockRejectedValue(error)

    const result = await sut.execute(input)

    expect(result.statusCode).toBe(500)
  })
})
