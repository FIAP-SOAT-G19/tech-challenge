import { UpdateEmployeeUseCase } from './update-employee.usecase'
import { ISchemaValidator, IUpdateEmployeeGateway } from '@/application/interfaces'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { mock } from 'jest-mock-extended'

const gateway = mock<IUpdateEmployeeGateway>()
const schemaValidator = mock<ISchemaValidator>()
const encryptoPassword = mock<IEncrypt>()

describe('UpdateEmployeeUseCase', () => {
  let sut: UpdateEmployeeUseCase
  let input: any

  beforeEach(() => {
    sut = new UpdateEmployeeUseCase(gateway, schemaValidator, encryptoPassword)
    input = {
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123'
    }
    schemaValidator.validate.mockReturnValue({ value: input })
    gateway.findById.mockResolvedValue(null)
  })

  test('should update an employee with valid input', async () => {
    const existingEmployee = {
      id: 'employeeId',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '1234567890',
      password: 'hashedpassword',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    }
    gateway.findById.mockResolvedValue(existingEmployee)
    gateway.update.mockResolvedValue(existingEmployee.id)

    schemaValidator.validate.mockReturnValue({ value: input })

    const result = await sut.execute(input)

    expect(result).toEqual('employeeId')
  })

  test('should throw InvalidParamError for non-existent employee', async () => {
    await expect(sut.execute(input)).rejects.toThrow('Employee not found')
  })

  test('should throw InvalidParamError for duplicate email', async () => {
    const existingEmployee = {
      id: 'employeeId',
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'hashedpassword',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    }
    gateway.findById.mockResolvedValue(existingEmployee)
    gateway.findByEmail.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
    await expect(sut.execute(input)).rejects.toThrow('Email already in use')
  })

  test('should throw InvalidParamError for duplicate cpf', async () => {
    const existingEmployee = {
      id: 'employeeId',
      name: 'John Doe',
      email: 'john@emai.com',
      cpf: '1234567890',
      password: 'hashedpassword',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    }
    gateway.findById.mockResolvedValue(existingEmployee)
    gateway.findByEmail.mockResolvedValue(null)
    gateway.findByCpf.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'john5522@email.com',
      cpf: '39585523550',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
    await expect(sut.execute(input)).rejects.toThrow('CPF already in use')
  })

  test('should throw SchemaValidationError for invalid input', async () => {
    const inputInvalid = {
      id: 'employeeId',
      name: 'John Doe',
      email: 'johnemail.com',
      cpf: '1235',
      password: 'password123'
    }
    const existingEmployee = {
      id: 'employeeId',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '1234567890',
      password: 'hashedpassword',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    }
    gateway.findById.mockResolvedValue(existingEmployee)
    gateway.findByEmail.mockResolvedValue(null)
    gateway.findByCpf.mockResolvedValue(null)
    schemaValidator.validate.mockReturnValue({
      value: {
        message: '"cpf" length must be 11 characters long'
      },
      error: 'SchemaValidationError'
    })

    await expect(sut.execute(inputInvalid)).rejects.toThrow('SchemaValidationError')
  })
})
