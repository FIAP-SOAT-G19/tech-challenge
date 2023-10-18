import { UpdateEmployeeUseCase } from './update-employee.usecase'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import { mock } from 'jest-mock-extended'
import { IEmployeeRepository } from '@/ports/repositories/employee.port'

const employeeRepository = mock<IEmployeeRepository>()
const schemaValidator = mock<ISchemaValidator>()

describe('UpdateEmployeeUseCase', () => {
  let sut: UpdateEmployeeUseCase
  let input: any

  beforeEach(() => {
    sut = new UpdateEmployeeUseCase(employeeRepository, schemaValidator)
    input = {
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123'
    }
    schemaValidator.validate.mockReturnValue({ value: input })
    employeeRepository.findById.mockResolvedValue(null)
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
    employeeRepository.findById.mockResolvedValue(existingEmployee)
    employeeRepository.update.mockResolvedValue(existingEmployee.id)

    schemaValidator.validate.mockReturnValue({ value: input })

    const result = await sut.execute(input)

    expect(result).toEqual('employeeId')
  })
})
