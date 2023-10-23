import { ReadEmployeeUseCase } from '@/domain/usecases/employee/read-employee.usecase'
import { IEmployeeRepository } from '@/ports/repositories/employee.port'
import { mock } from 'jest-mock-extended'
import { ReadEmployeeController } from './read-employee.controller'

const employeeRepository = mock<IEmployeeRepository>()

describe('ReadEmployeeController', () => {
  let sut: ReadEmployeeController
  let readEmployeeUseCase: ReadEmployeeUseCase

  beforeEach(() => {
    readEmployeeUseCase = new ReadEmployeeUseCase(employeeRepository)
    sut = new ReadEmployeeController(readEmployeeUseCase)
  })

  test('should return an employee with valid param', async () => {
    const httpRequest = {
      params: {
        id: 'anyId'
      }
    }
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

    const result = await sut.execute(httpRequest)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      employee: {
        id: 'anyId',
        name: 'John Doe',
        email: 'anyEmail',
        cpf: '1234567890',
        createdAt: new Date('2021-09-21T22:00:00.000Z'),
        updatedAt: new Date('2021-09-21T22:00:00.000Z')
      }
    })
  })

  test('should throw InvalidParamError for employee not found', async () => {
    const input = {
      params: {
        id: 'anyId'
      }
    }
    employeeRepository.findById.mockResolvedValue(null)

    const result = await sut.execute(input)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual({
      error: 'InvalidParamError',
      message: 'Invalid param: Employee not found'
    })
  })

  test('should throw ServerError if findById throws', async () => {
    const input = {
      params: {
        id: 'anyId'
      }
    }
    employeeRepository.findById.mockRejectedValue(new Error('Any error'))

    const result = await sut.execute(input)

    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual(new Error('Any error'))
  })
})
