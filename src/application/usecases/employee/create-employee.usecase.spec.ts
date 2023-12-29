import { CreateEmployeeUseCase } from './create-employee.usecase'
import { mock } from 'jest-mock-extended'
import { ISchemaValidator, IUUIDGenerator } from '@/application/interfaces'
import { IEmployeeRepository } from '@/application/interfaces/repositories/employee.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError } from '@/infra/shared'
import MockDate from 'mockdate'

const employeeRepository = mock<IEmployeeRepository>()
const schemaValidator = mock<ISchemaValidator>()
const uuidGenerator = mock<IUUIDGenerator>()
const encryptoPassword = mock<IEncrypt>()

describe('CreateEmployeeUseCase', () => {
  let sut: CreateEmployeeUseCase
  let input: any

  beforeEach(() => {
    sut = new CreateEmployeeUseCase(employeeRepository, schemaValidator, uuidGenerator, encryptoPassword)
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

    const result = await sut.execute(input)

    expect(result).toEqual('generatedUUID')
  })

  test('should throw InvalidParamError for duplicate email', async () => {
    employeeRepository.findByEmail.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    await expect(sut.execute(input)).rejects.toThrow(InvalidParamError)
  })

  test('should throw InvalidParamError for duplicate cpf', async () => {
    employeeRepository.findByCpf.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: null,
      deletedAt: null
    })
    await expect(sut.execute(input)).rejects.toThrow(InvalidParamError)
  })

  test('should throw SchemaValidationError for invalid input', async () => {
    const inputInvalid = {
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '',
      password: 'password123'
    }
    schemaValidator.validate.mockReturnValue({
      value: {
        message: "Invalid param: The 'cpf' field is required."
      },
      error: 'InvalidParamError'
    })
    await expect(sut.execute(inputInvalid)).rejects.toThrow("Invalid param: The 'cpf' field is required.")
  })
})
