import { mock } from 'jest-mock-extended'
import { GetAllEmployeesController } from './get-all-employees.controller'
import { GetEmployeeUseCase } from '@/application/usecases/employee/get-employee.usecase'
import { IGetEmployeeGateway } from '@/application/interfaces'

const gateway = mock<IGetEmployeeGateway>()

describe('ReadAllEmployeesController', () => {
  let sut: GetAllEmployeesController
  let getEmployeeUseCase: GetEmployeeUseCase

  beforeEach(() => {
    getEmployeeUseCase = new GetEmployeeUseCase(gateway)
    sut = new GetAllEmployeesController(getEmployeeUseCase)
  })

  test('should return all employees', async () => {
    gateway.findAll.mockResolvedValue([
      {
        id: 'anyId',
        name: 'John Doe',
        email: 'anyEmail',
        cpf: '1234567890',
        password: 'password123',
        createdAt: new Date('2021-09-21T22:00:00.000Z'),
        updatedAt: new Date('2021-09-21T22:00:00.000Z'),
        deletedAt: new Date('9999-12-31T23:59:59.999Z')
      }
    ])

    const result = await sut.execute()

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      employees: [{
        id: 'anyId',
        name: 'John Doe',
        email: 'anyEmail',
        cpf: '1234567890',
        createdAt: new Date('2021-09-21T22:00:00.000Z'),
        updatedAt: new Date('2021-09-21T22:00:00.000Z')
      }]
    })
  })

  test('should throw ServerError if findAll throws', async () => {
    gateway.findAll.mockRejectedValue(new Error('Any error'))

    const result = await sut.execute()

    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual({
      error: 'Error',
      message: 'Any error'
    })
  })
})
