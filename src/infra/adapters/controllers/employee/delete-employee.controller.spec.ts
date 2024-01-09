import { mock } from 'jest-mock-extended'
import { DeleteEmployeeController } from './delete-employee.controller'
import { DeleteEmployeeUseCase } from '@/application/usecases/employee/delete-employee.usecase'
import { IDeleteEmployeeGateway } from '@/application/interfaces'

const gateway = mock<IDeleteEmployeeGateway>()

describe('DeleteEmployeeController', () => {
  let sut: DeleteEmployeeController
  let deleteEmployeeUseCase: DeleteEmployeeUseCase

  beforeEach(() => {
    deleteEmployeeUseCase = new DeleteEmployeeUseCase(gateway)
    sut = new DeleteEmployeeController(deleteEmployeeUseCase)
  })

  test('should delete an employee with valid param', async () => {
    const httpRequest = {
      params: {
        id: 'anyId'
      },
      body: 'anyBody'
    }
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
    gateway.delete.mockResolvedValue()

    const result = await sut.execute(httpRequest)

    expect(result.statusCode).toBe(204)
    expect(result.body).toEqual({})
  })

  test('should throw InvalidParamError for employee not found', async () => {
    const input = {
      params: {
        id: 'anyId'
      }
    }
    gateway.findById.mockResolvedValue(null)

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
    gateway.findById.mockRejectedValue(new Error('Any error'))

    const result = await sut.execute(input)

    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual({
      error: 'Error',
      message: 'Any error'
    })
  })
})
