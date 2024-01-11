import { mock } from 'jest-mock-extended'
import { UpdateEmployeeController } from './update-employee.controller'
import { ISchemaValidator, IUpdateEmployeeGateway } from '@/application/interfaces'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { UpdateEmployeeUseCase } from '@/application/usecases/employee/update-employee.usecase'
import { ServerError } from '@/infra/shared'

const gateway = mock<IUpdateEmployeeGateway>()
const schemaValidator = mock<ISchemaValidator>()
const encryptoPassword = mock<IEncrypt>()

describe('UpdateEmployeeController', () => {
  let sut: UpdateEmployeeController
  let updateEmployeeUseCase: UpdateEmployeeUseCase
  let input: any

  beforeEach(() => {
    updateEmployeeUseCase = new UpdateEmployeeUseCase(gateway, schemaValidator, encryptoPassword)
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
    encryptoPassword.encrypt.mockReturnValue('encryptedPassword')
    gateway.findById.mockResolvedValue(null)
    gateway.findByEmail.mockResolvedValue(null)
    gateway.findByCpf.mockResolvedValue(null)
  })

  test('should update an employee with valid input', async () => {
    gateway.findById.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
    gateway.update.mockResolvedValue('anyId')

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
    gateway.findById.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    gateway.findByEmail.mockResolvedValue({
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
    gateway.findById.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'anyEmail',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    gateway.findByCpf.mockResolvedValue({
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

    gateway.findById.mockRejectedValue(error)

    const result = await sut.execute(input)

    expect(result.statusCode).toBe(500)
  })
})
